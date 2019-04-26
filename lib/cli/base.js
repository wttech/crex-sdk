const ora = require('ora');
const fs = require('fs');
const chalk = require('chalk');
const util = require('util');

const CrEx = require('../../lib/index');

module.exports = class Upload {
	constructor(program) {
		this.program = program;
		this.zipName = 'ce-import.zip'
		this.zipDownloadName = 'ce-download.zip';
		this.name = this.path = program.args[0];
		this.auth = this.getAuthFile() || {};
		this.credential = this.getCredential();
		this.crex = new CrEx(this.credential);

		this.globs = {
			nodeModules: '**/node_modules/**',
			allFiles: '**/*'
		}

		this.spinnerLabels = {
			compressing: 'Compressing package...',
			uploading: 'Uploading package to %s...',
			building: 'Building package...',
			installing: 'Installing package...',
			cleaning: 'Cleaning up...',
			extracting: 'Exporting package from %s...',
			downloading: 'Downloading package...',
			saving: 'Saving package...',
			searching: 'Searching for package with path/name ...',
			creating: 'Creating package with path %s...',
		}

		this.omit = [this.globs.nodeModules];
		this.spinner = ora(this.spinnerLabels.compressing);

		if (this.program.target) {
			this.crex.setTarget(this.program.target);
		}

		this.init();
	}

	async init() {}

	getAuthFile() {
		try {
			const authFile = fs.readFileSync(process.cwd() + '/auth.json', 'utf-8');
			return JSON.parse(authFile);
		} catch (err) {
			if (err.code !== 'ENOENT') {
				console.log(chalk.red('Auth.json: ' + err.toString()));
				process.exit();
			}
		}
	}

	getCredential() {
		if (Object.keys(this.auth).length > 0) {
			console.log(chalk.underline('Auth file found'));
		}
		
		return this.program.env ? this.auth[this.program.env] : this.auth;
	}

	reportSuccess(text, values = []) {
		console.log(`\n ${chalk.green('✔︎')} ${util.format(text, ...values)}`);
	}

	reportFail(err) {
		if (typeof err === "string") {
			this.spinner.fail(chalk.red(err));
			return process.exit(1);
		}

		if (err.code === 'ECONNREFUSED') {
			this.spinner.fail(chalk.red(`Error: ${err.code}\n Cannot connect to AEM`));
			return process.exit(1);
		}

		this.spinner.fail(chalk.red(`Error: ${err}\n${err.response.body.message}`));
		return process.exit(1);
	}
}

