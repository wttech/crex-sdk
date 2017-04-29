#!/usr/bin/env node
var program = require('commander');
var ora = require('ora');
var fs = require('fs');
var path = require('path');
var archiver = require('archiver');
var CrEx = require('../lib/index');

function list(val) {
	return val.split(',');
}

program
	.usage('<path to zip>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-c, --compress <directories>', 'specify directories to be compressed', list)
	.parse(process.argv);

if (program.args.length < 1 && !program.compress) {
	return program.help();
}

var name = program.args[0];
var spinner = ora('Compressing package...').start();
var crex = new CrEx();

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
	spinner.text = 'Installing...';
	return crex.importInstallPackage({
		id: res.model.id
	});
}).then(() => {
	spinner.succeed('Package ' + name + ' installed');
}).catch((err) => {
	spinner.fail(err);
});
