import fs from 'fs';
import CrEx from '../lib/index';
import { CommanderStatic } from 'commander';

export default class Base {
	public crex: CrEx;
	public auth;
	public credential;
	public omit = ['**/node_modules/**']

	constructor(public program: CommanderStatic) {
		this.program = program;
		this.auth = this.getAuthFile() || {};
		this.credential = this.getCredential();
		this.crex = new CrEx(this.credential);
		
		this.init();
	}

	public async  init() {}

	private getAuthFile() {
		try {
			const authFile = fs.readFileSync(process.cwd() + '/auth.json', 'utf-8');
			return JSON.parse(authFile);
		} catch (err) {
			if (err.code !== 'ENOENT') {
				console.error('Auth.json: ' + err.toString());
				process.exit(1);
			}
		}
	}

	private getCredential() {
		if (Object.keys(this.auth).length > 0) {
			console.log('Auth file found');
		}
		
		return this.program.env ? this.auth[this.program.env] : this.auth;
	}
}

