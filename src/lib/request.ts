// @ts-ignore
import * as request from 'superagent';
import { CrExResponse, CrExRequestOptions, CrExRequestArgs } from '../index';

export const doGet = (url: string, args: CrExRequestArgs, config: CrExRequestOptions): CrExResponse => {
	return new Promise((resolve, reject) => {
		request
			.get(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.buffer(true)
			.end((err: any, res: any) => {
				if (err || !res || !Object.keys(res.body).length) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			})
	});
};

export const doPost = (url: string, args: CrExRequestArgs, config: CrExRequestOptions): CrExResponse => {
	return new Promise((resolve, reject) => {
		request
			.post(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.type('form')
			.query(args)
			.end((err: any, res: any) => {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			});
	});
};

export const doDelete = (url: string, args: CrExRequestArgs, config: CrExRequestOptions): CrExResponse => {
	return new Promise((resolve, reject) => {
		request
			.delete(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.end((err: any, res: any) => {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			});
	});
};

export const doUpload = (url: string, args: CrExRequestArgs, config: CrExRequestOptions): CrExResponse => {
	return new Promise((resolve, reject) => {
		request
			.post(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.attach('file', args['file'])
			.end((err: any, res: any) => {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			});
	});
}

export const doDownload = (url: string, args: CrExRequestArgs, config: CrExRequestOptions): CrExResponse => {
	return new Promise((resolve, reject) => {
		request
			.get(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.buffer(true)
			.parse(nodeBinaryParser)
			.end((err: any, res: any) => {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			});
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