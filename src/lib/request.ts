
import { AxiosInstance } from 'axios';
import { CrExResponse, CrExRequestOptions, CrExRequestArgs, CrExPackage } from '../index';

export const doGet = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
	new Promise((resolve, reject) => {
		instance
			.get(url, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.message))
	})
);

export const doPost = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
	new Promise((resolve, reject) => {
		instance
			.post(url, undefined, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err))
	})
);

export const doInstall = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
	new Promise((resolve, reject) => {
		instance
			.post(url, undefined, { params })
			.then((res) => resolve(res.data))
			.catch((err) => console.log(err))
	})
);

export const doDelete = (url: string, params: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
	new Promise((resolve, reject) => {
		instance
			.delete(url, { params })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.message))
	})
);

export const doUpload = (url: string, data: CrExRequestArgs, instance: AxiosInstance): CrExResponse => (
	new Promise((resolve, reject) => {
		let file;

		if(typeof process === 'object') {
			const FD = require('form-data');
			file = new FD();
		} else {
			file = new FormData();
		}

		file.append('file', data.file)

		instance
			.post(url,
				file,
				{ headers: file.getHeaders() }
			)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err.message))
	})
);

// TODO
export const doDownload = (url: string, args: CrExRequestArgs, config: AxiosInstance): CrExResponse => {
	return new Promise((resolve, reject) => {

	});
}

const nodeBinaryParser = (res: any, done: any) => {
	res.setEncoding('binary');
	res.text = '';
	res.on('data', (chunk: string) => {
		res.text += chunk;
	});
	res.on('end', () => {
		done(null, new Buffer(res.text, 'binary'));
	});
};