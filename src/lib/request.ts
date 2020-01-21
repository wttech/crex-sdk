
import { AxiosInstance } from 'axios';
import { CrExResponse, CrExRequestOptions, CrExRequestArgs, CrExPackage } from '../index';
import FormData from 'form-data';
import fs from 'fs';

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
		const formData = new FormData();
		let headers = {};
		let knownLength = 0;

		if (data.filePath) {
			const formData = new FormData();
			formData.append("firstFile", fs.createReadStream(data.filePath))
			knownLength = fs.statSync(data.filePath).size
		}

		headers = {
			...formData.getHeaders(),
			"Content-Length": knownLength
		};

		console.log(headers);

		instance
			.post(url,
				formData,
				{ headers }
			)
			.then((res) => resolve(res.data))
			.catch((err) => resolve(err.message))
	})
);

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