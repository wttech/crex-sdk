var api = require('./api');
var request = require('./request');
var assign = require('object-assign');

var DEFAULTS = {
	user: 'admin',
	password: 'admin',
	url: 'localhost',
	port: '4502'
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
var CrEx = function (options) {
	options = assign({}, DEFAULTS, options) || {};
	this.user = options.user;
	this.password = options.password;
	this.url = options.url;
	this.port = options.port;

	this.full = this.user + ':' + this.password + '@' + this.url + ':' + this.port;
};

CrEx.prototype.setUrl = function (url) {
	this.full = url;
};

CrEx.prototype.getUrl = function () {
	return this.full;
};

CrEx.prototype.getAddress = function () {
	return this.url + ':' + this.port;
}

CrEx.prototype.request = function(method, url, args) {
	var req = null;
	url = this.getUrl() + url;

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

	return req(url, args);
};

CrEx.prototype = assign(CrEx.prototype, api);

module.exports = CrEx;