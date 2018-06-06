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
} catch (err) {
	if (err.code !== 'ENOENT') {
		console.log(chalk.red('Auth.json: ' + err.toString()));
		process.exit();
	}
}

const list = (val) => {
	return val.split(',');
};

program
	.usage('<path>')
	.option('-t, --target <url>', 'specify target instance')
	.option('-x, --extract [destination]', 'extract downloaded package')
	.option('-f, --filter <paths>', 'filter specific paths to be extracted', list, ['/'])
	.option('-e, --env <name>', 'specify environment from auth.json')
	.parse(process.argv);

if (program.args.length < 1) {
	return program.help();
}

if (Object.keys(auth).length > 0) {
	console.log(chalk.underline('Auth file found'));
}

var id = null;
var paths = program.args[0].split(',');
var filters = program.filter.map((filter) => (filter.charAt(0) === '/') ? filter : '/' + filter);
var creds = program.env ? auth[program.env] : auth;
if (typeof creds === 'undefined') {
	console.log(chalk.red(util.format('No such environment as "%s" in Auth file', program.env)));
	process.exit();
}
var crex = new CrEx(creds);
var name = null;

if (program.target) {
	crex.setTarget(program.target);
}

var spinner = ora(util.format('Exporting package from %s...', chalk.green(crex.getAddress()))).start();
var checkStatus = (id) => {
	return new Promise((resolve, reject) => {
		return crex.exportGetPackageStatus({id: id})
			.then(function (res) {
				if (res[0].status !== 'DONE') {
					reject(id);
				}
				resolve(id);
			}, function () {
				reject(false);
			});
	});
};

paths = paths.map((path) => (path.charAt(0) === '/') ? path : '/' + path);

crex.exportCreatePackage({
	roots: paths,
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
}).then((packageId) => {
	spinner.text = 'Downloading package...';
	id = packageId;
	return crex.exportDownloadPackage({id: packageId});
}).then((file) => {
	spinner.text = 'Saving package...';
	return new Promise((resolve, reject) => {
		fs.writeFile(name, file, function (err) {
			if (err) reject(err);
			resolve(name);
		});
	});
}).then((package) => {
	spinner.text = 'Cleaning up...';

	return crex.exportRemovePackage({
		id: id
	}).then(() => {
		return package;
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
	if (typeof err !== 'string' ) {
		err = 'Error: Something went wrong. Check passed parameters.'
	}
	spinner.fail(chalk.red(err));
});