#!/usr/bin/env node
var program = require('commander');
var ora = require('ora');
var fs = require('fs');
var util = require('util');
var chalk = require('chalk');
var path = require('path');
var archiver = require('archiver');
var CrEx = require('../lib/index');
var bump = require('theme-bump');
var poller = require('promise-poller');
var auth = {};
var versionsUpdated = {};

const zipFileName = 'ce-import.zip';

try {
	auth = fs.readFileSync(process.cwd() + '/auth.json', 'utf-8');
	auth = JSON.parse(auth);
} catch (err) {
	if (err.code !== 'ENOENT') {
		console.log(chalk.red('Auth.json: ' + err.toString()));
		process.exit();
	}
}

const list = (val) => {
	return val.split(',');
};

const stripHtml = (text) => {
	return text.replace('<br>', ' ').replace(/<(?:.|\n)*?>/gm, '');
}

const reportChanges = (data, type) => {
	var messages = data[type.toLowerCase() + 'FilesAmended'].filter((file) => {
		return file.action.type !== 'IGNORED';
	});

	if (messages.length === 0) {
		return false;
	}

	console.log();
	console.log(chalk.underline(util.format('%s files changed:\n', type)));
	messages.forEach((file) => {
		const color = (file.action.type === 'CHANGED') ? 'green' : 'red';
		console.log(util.format('    %s %s', chalk[color](file.action.type.toLowerCase() + ':'), '   ' + chalk[color](file.path)));
	});
};

program
	.usage('[path to zip or zip name]')
	.option('-c, --compress <directories>', 'specify directories to be compressed', list)
	.option('-o, --omit <globs>', 'specify globs to be omitted when creating zip', list)
	.option('-f, --file <name>', 'specify file name for zip')
	.option('-p, --package', 'creates zip file, do not send the package to environment')
	.option('-t, --target <url>', 'specify target instance')
	.option('-i, --inspect', 'inspect package')
	.option('-e, --env <name>', 'specify environment from auth.json')
	.option('-a, --activate', 'activate after install')
	.option('-b, --bump [version]', 'bump version in non-protected themes')
	.parse(process.argv);

if (program.args.length < 1 && !program.compress) {
	return program.help();
}

if (Object.keys(auth).length > 0) {
	console.log(chalk.underline('Auth file found'));
}

var id = null;
var name = '';
var ver = (program.bump === true) ? 'patch' : program.bump;
var creds = program.env ? auth[program.env] : auth;
var omit = program.omit ? program.omit : ['**/node_modules/**'];

if (typeof creds === 'undefined') {
	console.log(chalk.red(util.format('No such environment as "%s" in Auth file', program.env)));
	process.exit();
}

var crex = new CrEx(creds);
var spinner = ora('Compressing package...').start();

if (program.target) {
	crex.setTarget(program.target);
}

var checkStatus = (id) => {
	return new Promise((resolve, reject) => {
		return crex.themesCheckActivateProgress({id: id})
			.then(function (res) {
				if (res.status !== 'DONE') {
					reject(id);
				}
				resolve(id);
			});
	});
};

var pipelinePromise = new Promise((resolve, reject) => {
  if (program.compress) {
    name = program.file || program.args[0] || zipFileName;
    var output = fs.createWriteStream(name);
    var zip = archiver('zip');

    zip.pipe(output);

    output.on('close', function () {
      resolve();
    });

    zip.on('error', function (err) {
      reject(err);
    });

    program.compress.forEach((folder) => {
      versionsUpdated = ver ? Object.assign({}, versionsUpdated, bump(folder, ver)) : {};

      const ignore = [...omit, `**/${zipFileName}`];

      zip.glob(folder + '/**/*', {
        cwd: (folder.charAt(0) === '/') ? folder : process.cwd(),
        dot: true,
        ignore
      });
    });

    spinner.text = 'Compressing package...';

    zip.finalize();
  } else {
    resolve();
  }
});

if (program.package) {
  pipelinePromise
    .then(() => {
      spinner.succeed(util.format('Package %s saved', chalk.green(name)));
    });
} else {
  pipelinePromise
    .then(() => {
      console.log('SHOULD NOT BE HERE');
      spinner.text = util.format('Uploading package to %s...', chalk.green(crex.getAddress()));
      return crex.importUploadPackage({
        file: fs.createReadStream(name)
      });
    }).then((res) => {
      id = res.model.id;

      if (!program.inspect) {
        spinner.text = 'Installing package...';
        return crex.importInstallPackage({
          id: res.model.id
        });
      } else {
        spinner.text = 'Inspecting package...';
        return crex.importInspectPackage({
          id: res.model.id
        });
      }
    }).then((package) => {
      spinner.text = 'Cleaning up...';

      fs.unlink(zipFileName, function (err) {
        if (err) return;
      });

      return crex.importRemovePackage({
        id: id
      }).then(() => {
        return package;
      });
    }).then((res) => {
      spinner.text = 'Presenting report...';
      const action = program.inspect ? 'inspected' : 'installed';
      const themesToActivate = [];
      const warnings = res.messages.filter((message) => message.type === 'WARNING').length;
      const errors = res.messages.filter((message) => message.type === 'ERROR').length;

      spinner.succeed(util.format('Package %s %s on %s', chalk.green(name), action, chalk.green(crex.getAddress())));
      console.log();
      console.log(chalk.yellow('⚠') + util.format(' %s warnings', warnings));
      console.log(chalk.red('✖') + util.format(' %s errors', errors));

      res.messages.forEach((message, i) => {
        var text = stripHtml(message.messageText);

        if (i === 0) {
          console.log();
        }

        switch (message.type) {
          case 'WARNING':
            console.log(chalk.yellow('Warning: ' + text));
            break;
          case 'ERROR':
            console.log(chalk.red('Error: ' + text));
            break;
        }
      });
      console.log(chalk.underline("\nThemes affected:\n"));
      res.themeStatuses.forEach((theme) => {
        if (theme.themeAction !== 'IGNORED' && theme.themeAction !== 'UNTOUCHED') {
          themesToActivate.push(theme.themePath);
        }
        const color = (theme.themeAction.toLowerCase() === 'changed') ? chalk.green : chalk.grey;
        const version = versionsUpdated[theme.themePath.substring(1)];
        const versionInfo = (version && version.old !== version.new) ? util.format('(version %s ➔ %s)', version.old, version.new) : '';
        console.log(util.format('    %s %s %s', theme.themePath + ':', '   ' + color(theme.themeAction.toLowerCase()), chalk.blue(versionInfo)));
      });

      reportChanges(res, 'Css');
      reportChanges(res, 'Js');
      reportChanges(res, 'Other');
      console.log();

      if (themesToActivate.length > 0 && program.activate && !program.inspect) {
        spinner = ora('Activating package...').start();
        return crex.themesActivateThemes({ themes: JSON.stringify(themesToActivate) });
      } else {
        return false;
      }
    }).then((package) => {
      if (!package) {
        return false;
      }
      return poller.default({
        taskFn: function () {
          return checkStatus(package.id)
        },
        retries: 10000
      })
    }).then((res) => {
      if (!res) {
        return false;
      }
      spinner.succeed(util.format('Package %s activated', chalk.green(name)));
    }).catch((err) => {
      spinner.fail(chalk.red(err));
    });
}
