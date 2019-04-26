const fs = require('fs');
const chalk = require('chalk');
const Zip = require('adm-zip');
const Base = require('./base');

module.exports = class Download extends Base {
	constructor(program) {
		super(program);
		this.filters = this.getFilters();
	}

	async init() {
		const { extract, path } = this.program;
		const packages = await this.getPackagesList();
		let item;
		this.spinner.start();

		if (path) {
			item = this.getPackageWithPath(packages, path);
		} else {
			item = this.getPackageWithName(packages, this.name);
		}

		if (!item) {
			this.reportFail('Package not found ;(. \n To create package you need to use `ce create`');
			return;
		}

		await this.buildPackage(item);
		await this.downloadPackage(item);

		if (extract) {
			this.extractPackages();
		}

		this.cleanUp();
	}

	async getPackagesList() {
		this.spinner.text = this.spinnerLabels.searching;
		this.spinner.start();

		try {
			const request = await this.crex.getPackageList({ 
				perPage: 100
			});

			return request;
		} catch (err) {
			this.reportFail(err);
		}
	}
	
	async createPackages(rootPath) {
		this.spinner.text = this.spinnerLabels.creating;

		try {
			const request = await this.crex.createPackage({ rootPath })
			this.reportSuccess('Package created on %s', [ this.crex.getAddress() ]);

			return request;
		} catch (err) {
			this.reportFail(err);
		}
	}

	async downloadPackage({ packageId, rootPath}) {
		this.spinner.text = this.spinnerLabels.downloading;

		try {
			const file = await this.crex.downloadPackage({
				packageId
			});

			this.reportSuccess('Package downloaded from %s', [ this.crex.getAddress() ]);
			await this.savePackage(file, rootPath);

			return ;
		} catch (err) {
			this.reportFail(err);
		}
	}

	savePackage(file) {
		this.spinner.text = this.spinnerLabels.saving;

		return new Promise((resolve, reject) => {
			fs.writeFile(this.zipDownloadName, file, (err) => {
				if (err) reject(err);

				this.reportSuccess('Package saved');
				resolve(this.zipDownloadName);
			});
		});
	}

	async buildPackage({ packageId }) {
		this.spinner.text = this.spinnerLabels.building;

		try {
			const request = this.crex.buildPackage({
				packageId,
				synchronous: true
			});

			this.reportSuccess('Package built on %s', [ this.crex.getAddress() ]);

			return request;
		} catch (err) {
			this.reportFail(err);
		}
	}

	extractPackages() {
		const dest = (this.program.extract === true) ? '.' : this.program.extract
		const zip = new Zip(this.zipDownloadName);
		const zipEntries = zip.getEntries();

		this.spinner.text = this.spinnerLabels.extracting;

		zipEntries.forEach((zipEntry) => {
			const path = '/' + zipEntry.entryName.split('/').slice(1, -1).join('/');

			if (this.filters.every((filter) => !path.startsWith(filter))) {
				return false;
			}

			zip.extractEntryTo(zipEntry.entryName, dest + path, false, true);
		});

		this.reportSuccess(
			'Package %s extracted to %s',
			[
				this.zipDownloadName,
				dest
			]
		);
	}

	cleanUp() {
		this.spinner.stop();

		if (this.program.extract) {
			fs.unlink(this.zipDownloadName, (err) => {
				if (err) return;
			});
		}
	}

	getPackageWithName(packages, name) {
		return packages.find((item) => (
			item.name === name
		));
	}

	getPackageWithPath(packages, path) {
		return packages.find((item) => (
			item.rootPath === path
		));
	}

	getFilters() {
		const { filter } = this.program
		return  filter.map((item) => (item.charAt(0) === '/') ? item : '/' + item);
	}
}
