import ora from 'ora';
import { Command } from 'commander';
import CrEx from '../lib';
import { spinnerMsg } from './msgs';

export default class Create {
	private spinner = ora('');
	private crex = new CrEx();

	constructor(program: Command) {
		this.init(program.args[0], program.packageName);
	}

	init(path: string, packageName: string) {
		this.createPackage(path, packageName);
	}

	createPackage(path: string, name: string) {
		const rootPath = !path.startsWith('/') ? `/${path}` : path;

		this.spinner.start(spinnerMsg.creating);
		this.spinner.fail(spinnerMsg.creating);

		this.crex.createPackage({ rootPath, name })
			.then((res) => {
				this.spinner.succeed('Package created on %s named %s');
			})
			.catch((err) => {
				this.spinner.fail(err);
			})
	}
}