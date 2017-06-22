#!/usr/bin/env node
var fs = require('fs');
var ora = require('ora');
var util = require('util');
var chalk = require('chalk');
var program = require('commander');
var poller = require('promise-poller');
var Zip = require('adm-zip');
var CrEx = require('../lib/index');
var auth = {};

try {
	auth = fs.readFileSync(process.cwd() + '/auth.json', 'utf-8');
	auth = JSON.parse(auth);
} catch (err) { }

const list = (val) => {
	return val.split(',');
};

program
	.usage('<path>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-x, --extract [destination]', 'extract downloaded package')
	.option('-f, --filter <paths>', 'filter specific paths to be extracted', list, ['/'])
	.parse(process.argv);

if (program.args.length < 1) {
	return program.help();
}

if (Object.keys(auth).length > 0) {
	console.log(chalk.underline('Auth file found'));
}

var path = program.args[0];
var filters = program.filter.map((filter) => (filter.charAt(0) === '/') ? filter : '/' + filter);
var crex = new CrEx(auth);
var name = null;
var spinner = ora(util.format('Exporting package from %s...', chalk.green(crex.getAddress()))).start();

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

path = (path.charAt(0) === '/') ? path : '/' + path;

crex.exportCreatePackage({
	roots: path,
	force: true,
	engine: 'Simple'
}).then((package) => {
	name = package.fileName;
	return poller.default({
		taskFn: function() {
			return checkStatus(package.id)
		},
		retries: 10000
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

			if (filters.every((filter) => !path.startsWith(filter))) {
				return false;
			}

			zip.extractEntryTo(zipEntry.entryName, dest + path, false, true);
		});
		fs.unlink(package, function(err){
			if (err) return;
		});
		spinner.succeed(util.format('Package %s downloaded from %s and extracted to %s', chalk.green(package), chalk.green(crex.getAddress()), chalk.green(dest)));
	} else {
		spinner.succeed(util.format('Package %s downloaded from %s', chalk.green(package), chalk.green(crex.getAddress())));
	}
}).catch((err) => {
	spinner.fail(chalk.red(err));
});