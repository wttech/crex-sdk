const Base = require('./base');
const util = require('util');

module.exports = class Create extends Base {
	async init() {
		const { packageName } = this.program;
		this.spinner.text = util.format(
			this.spinnerLabels.creating,
			this.path
		);
		this.spinner.start();
		await this.createPackages(this.path, packageName)

		this.cleanUp();
	}

	async createPackages(rootPath, name = null) {
		const path = !rootPath.startsWith('/') ? `/${rootPath}` : rootPath;
		this.spinner.text = util.format(this.spinnerLabels.creating, path);
		try {
			const request = await this.crex.createPackage({ rootPath: path, name })
			const packageName = name || request.name;
			this.reportSuccess('Package created on %s named %s', [ this.crex.getAddress(), packageName]);

			return request;
		} catch (err) {
			this.reportFail(err);
		}
	}

	cleanUp() {
		this.spinner.stop();
	}
}

