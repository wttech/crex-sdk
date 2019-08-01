const api = require('./api');
const request = require('./request');

const DEFAULTS = {
	user: 'admin',
	password: 'admin',
	url: 'localhost',
	port: '4502',
	proxy: process.env.https_proxy || process.env.http_proxy
};

/**
 * @class CrEx
 * @classdesc The Creative Exchange SDK class that provides methods to export, import
 * packages and access theme information
 * @arg {Object} options
 * @arg {String} [options.url=localhost] - AEM instance address
 * @arg {String} [options.port=4502] - AEM instance port
 * @arg {String} [options.user=admin] - Username to access AEM instance
 * @arg {String} [options.password=admin] - Password for username
 */

class CrEx {
	constructor(options) {
		options = Object.assign({}, DEFAULTS, options) || {};
		this.user = options.user;
		this.password = options.password;
		this.url = options.url;
		this.port = options.port;
		this.proxy = options.proxy;

		Object.assign(this, api);
	}

	request(method, url, args) {
		let req = null;
		url = this.getAddress() + url;

		switch (method) {
			case 'GET':
				req = request.doGet;
				break;
			case 'POST':
				req = request.doPost;
				break;
			case 'DELETE':
				req = request.doDelete;
				break;
			case 'UPLOAD':
				req = request.doUpload;
				break;
			case 'DOWNLOAD':
				req = request.doDownload;
				break;
		}
	
		return req(url, args, this);
	};

	setTarget(target) {
		var credentials = target.substr(0, target.lastIndexOf('@')).split(':');
		var address = target.substr(target.lastIndexOf('@') + 1).split(':');
		
		this.user = credentials[0];
		this.password = credentials[1];
		this.url = address[0];
		this.port = address.length > 1 ? address[1] : '';
	};

	getAddress() {
		return (this.port !== '' ? `${this.url}:${this.port}` : this.url) || '';
	};
}

module.exports = CrEx;