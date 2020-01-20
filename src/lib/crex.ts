import { CrExArgPackage, CrExArgAllPackage, CrExArgNewPackage, CrExArgBuildPackage, CrExResponse, CrExArgUploadPackage, CrExOptions } from '../index';
import { doGet } from './request';
const rootPath = '/apps/creative-exchange/web-api';

export default class CrEx {
	public user: string = 'admin';
	public password: string = 'admin';
	public url: string = 'localhost';
	public port: string = '4502';
	public proxy: any = process.env.https_proxy || process.env.http_proxy;
	public address: string;

	constructor(options: CrExOptions = {}) {
		Object.assign(this, options)
		this.address = this.getAddress();
	}

	public setTarget(target: string) {
		var credentials = target.substr(0, target.lastIndexOf('@')).split(':');
		var address = target.substr(target.lastIndexOf('@') + 1).split(':');
		
		this.user = credentials[0];
		this.password = credentials[1];
		this.url = address[0];
		this.port = address.length > 1 ? address[1] : '';
	};

	public getAddress = (): string  => (this.port !== '' ? `${this.url}:${this.port}` : this.url) || '';

	// API
	public getPackageStatus = (args: CrExArgPackage): CrExResponse => this.request('GET', `${rootPath}/status.json`, args);

	public getPackageList =  (args?: CrExArgAllPackage): CrExResponse => this.request('GET', `${rootPath}/packages.json`, args);

	public createPackage = (args: CrExArgNewPackage): CrExResponse => this.request('POST', `${rootPath}/create.json`, args)

	public buildPackage = (args: CrExArgBuildPackage): CrExResponse => this.request('POST', `${rootPath}/build.json`, args)

	public downloadPackage = (args: CrExArgPackage): CrExResponse => this.request('DOWNLOAD', `${rootPath}/download`, args)

	public deletePackage = (args: CrExArgPackage): CrExResponse => this.request('DELETE', `${rootPath}/package.json`, args)

	public uploadPackage = (args: CrExArgUploadPackage): CrExResponse => this.request('UPLOAD', `${rootPath}/upload.json`, args)

	public installPackage = (args: CrExArgPackage): CrExResponse => this.request('POST', `${rootPath}/install.json`, args)

	private request(method: string, path: string, args: any): CrExResponse {
		const fullPath = this.address + path;

		switch (method) {
			// case 'POST':
			// 	return doPost(fullPath, args, this);
			// case 'DELETE':
			// 	return doDelete(fullPath, args, this);
			// case 'UPLOAD':
			// 	return doUpload(fullPath, args, this);
			// case 'DOWNLOAD':
			// 	return doDownload(fullPath, args, this);
			default:
				return doGet(fullPath, args, this);
		}
	};
};
