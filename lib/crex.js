var api = require('./api');
var request = require('./request');

var CrEx = function (options) {
	options = options || {};
	this.user = options.user;
	this.password = options.password;
	this.url = options.url;
	this.port = options.port;
};

CrEx.prototype.getUrl = function () {
	return this.user + ':' + this.password + '@' + this.url + ':' + this.port;
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
	}

	return req(url, args);
};

CrEx.prototype = Object.assign(CrEx.prototype, api);

module.exports = CrEx;