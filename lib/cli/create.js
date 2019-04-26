const chalk = require('chalk');
const Base = require('./base');
const util = require('util');

module.exports = class Create extends Base {
	async init() {
		const { name } = this.program;
		this.spinner.text = util.format(
			this.spinnerLabels.creating,
			this.path
		);
		this.spinner.start();
		await this.createPackages(this.path, name)

		this.cleanUp();
	}

	async createPackages(rootPath, name = null) {
		this.spinner.text = this.spinnerLabels.creating;

		try {
			const request = await this.crex.createPackage({ rootPath, name })
			this.reportSuccess('Package created on %s', [ this.crex.getAddress() ]);

			return request;
		} catch (err) {
			this.spinner.fail(chalk.red(`Error: ${err}\n${err.response.body.message}`));
		}
	}

	cleanUp() {
		this.spinner.stop();
	}
}

