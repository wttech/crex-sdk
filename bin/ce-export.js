#!/usr/bin/env node
var fs = require('fs');
var ora = require('ora');
var chalk = require('chalk');
var program = require('commander');
var poller = require('promise-poller');
var Zip = require('adm-zip');
var CrEx = require('../lib/index');

program
	.usage('<path>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-x, --extract [destination]', 'extract downloaded package')
	.parse(process.argv);

if (program.args.length < 1) {
	return program.help();
}

var path = program.args[0];
var crex = new CrEx();
var name = null;
var spinner = ora('Exporting package...').start();

if (program.target) {
	crex.setUrl(program.target);
}

var checkStatus = (id) => {
	return new Promise((resolve, reject) => {
		return crex.exportGetPackageStatus({id: id})
			.then(function (res) {
				if (res[0].status !== 'DONE') {
					reject(id);
				}
				resolve(id);
			});
	});
};

path = (path.substring(1) === '/') ? path : '/' + path;

crex.exportCreatePackage({
	roots: path,
	force: true,
	engine: 'Simple'
}).then((package) => {
	name = package.fileName;
	return poller.default({
		taskFn: function() {
			return checkStatus(package.id)
		}
	})
}).then((id) => {
	spinner.text = 'Downloading package...';
	return crex.exportDownloadPackage({id: id});
}).then((file) => {
	spinner.text = 'Saving package...';
	return new Promise((resolve, reject) => {
		fs.writeFile(name, file, function (err) {
			if (err) reject(err);
			resolve(name);
		});
	});
}).then((package) => {
	if (program.extract) {
		spinner.text = 'Extracting package...';
		var dest = (program.extract === true) ? '.' : program.extract;
		var zip = new Zip(package);
		var zipEntries = zip.getEntries();
		zipEntries.forEach(function(zipEntry) {
			var path = '/' + zipEntry.entryName.split('/').slice(1, -1).join('/');
			zip.extractEntryTo(zipEntry.entryName, dest + path, false, true);
		});
		fs.unlink(package, function(err){
			if (err) return;
		});
		spinner.succeed('Package ' + chalk.blue(package) + ' downloaded and extracted to ' + chalk.blue(dest));
	} else {
		spinner.succeed('Package ' + chalk.blue(package) + ' downloaded');
	}
}).catch((err) => {
	spinner.fail(chalk.red(err));
});