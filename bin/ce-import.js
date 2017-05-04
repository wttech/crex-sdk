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
	auth = fs.readFileSync('auth.json', 'utf-8');
	auth = JSON.parse(auth);
} catch (err) { }

const list = (val) => {
	return val.split(',');
};

const reportChanges = (data, type) => {
	var messages = data[type.toLowerCase() + 'FilesAmended'].filter((file) => {
		return file.action.type !== 'IGNORED';
	});

	if (messages.length === 0) {
		return false;
	}

	console.log();
	console.log(chalk.underline(util.format('%s files changed', type)));
	messages.forEach((file) => {
		const color = (file.action.type === 'CHANGED') ? 'green' : 'red';
		console.log(util.format('%s %s', chalk[color](file.action.type), chalk.grey(file.path)));
	});
};

program
	.usage('<path to zip>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-c, --compress <directories>', 'specify directories to be compressed', list)
	.option('-i, --inspect', 'inspect package')
	.parse(process.argv);

if (program.args.length < 1 && !program.compress) {
	return program.help();
}

if (Object.keys(auth).length > 0) {
	console.log(chalk.underline('Auth file found'));
}

var name = program.args[0];
var spinner = ora('Compressing package...').start();
var crex = new CrEx(auth);

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
			zip.directory(folder + '/', path);
		});

		zip.finalize();
	} else {
		resolve();
	}
}).then(() => {
	spinner.text = 'Uploading package...';
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
	res.themeStatuses.forEach((theme) => {
		if (theme.themeAction !== 'IGNORED') {
			console.log(util.format('Theme %s %s', chalk.blue(theme.themeName), theme.themeAction.toLowerCase()));
		}
	});
	reportChanges(res, 'Js');
	reportChanges(res, 'Css');
	reportChanges(res, 'Other');
}).catch((err) => {
	spinner.fail(chalk.red(err));
});
