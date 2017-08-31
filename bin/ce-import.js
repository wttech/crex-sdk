#!/usr/bin/env node
var program = require('commander');
var ora = require('ora');
var fs = require('fs');
var util = require('util');
var chalk = require('chalk');
var path = require('path');
var archiver = require('archiver');
var CrEx = require('../lib/index');
var auth = {};

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
	.usage('[path to zip]')
	.option('-t, --target <url>', 'specify target instance')
	.option('-c, --compress <directories>', 'specify directories to be compressed', list)
	.option('-i, --inspect', 'inspect package')
	.option('-e, --env <name>', 'specify environment from auth.json')
	.parse(process.argv);

if (program.args.length < 1 && !program.compress) {
	return program.help();
}

if (Object.keys(auth).length > 0) {
	console.log(chalk.underline('Auth file found'));
}

var name = program.args[0];
var creds = program.env ? auth[program.env] : auth;
if (typeof creds === 'undefined') {
	console.log(chalk.red(util.format('No such environment as "%s" in Auth file', program.env)));
	process.exit();
}
var crex = new CrEx(creds);
var spinner = ora('Compressing package...').start();

if (program.target) {
	crex.setUrl(program.target);
}

new Promise((resolve, reject) => {
	if (program.compress) {
		name = 'ce-import.zip';
		var output = fs.createWriteStream(name);
		var zip = archiver('zip');

		zip.pipe(output);

		output.on('close', function() {
			resolve();
		});

		zip.on('error', function(err) {
			reject(err);
		});

		program.compress.forEach((folder) => {
			const path = folder.split('/').pop();
			zip.glob(path + '/**/*', {
				ignore: '**/node_modules/**'
			});
		});

		zip.finalize();
	} else {
		resolve();
	}
}).then(() => {
	spinner.text = util.format('Uploading package to %s...', chalk.green(crex.getAddress()));
	return crex.importUploadPackage({
		file: fs.createReadStream(name)
	});
}).then((res) => {
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
}).then((res) => {
	fs.unlink('ce-import.zip', function(err){
		if (err) return;
	});

	const action = program.inspect ? 'inspected' : 'installed';
	spinner.succeed(util.format('Package %s %s on %s', chalk.green(name), action, chalk.green(crex.getAddress())));
	console.log();
	const warnings = res.messages.filter((message) => message.type === 'WARNING').length;
	const errors = res.messages.filter((message) => message.type === 'ERROR').length;
	console.log(chalk.yellow('⚠') + util.format(' %s warnings', warnings));
	console.log(chalk.red('✖')  + util.format(' %s errors\n', errors));
	res.messages.forEach((message) => {
		var text = stripHtml(message.messageText);

		switch (message.type) {
			case 'WARNING':
				console.log(chalk.yellow('Warning: ' + text));
				break;
			case 'ERROR':
				console.log(chalk.red('Error: ' + text));
				break;
		}
	});
	if (res.themeStatuses.filter((theme) => theme.themeAction !== 'IGNORED').length > 0) {
		console.log();
	}
	console.log(chalk.underline("Themes affected:\n"));
	res.themeStatuses.forEach((theme) => {
		console.log(util.format('    %s %s', chalk.blue(theme.themeName + ':'),'   ' + theme.themeAction.toLowerCase()));
	});
	reportChanges(res, 'Css');
	reportChanges(res, 'Js');
	reportChanges(res, 'Other');
	console.log();
}).catch((err) => {
	spinner.fail(chalk.red(err));
});
