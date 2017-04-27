var api = require('./api');
var DEFAULTS = {

}

var CrEx = function (options) {
	options = options || {};
	this.admin = options.admin;
	this.password = options.password;
	this.server = options.server;
	this.port = options.port;
};

CrEx.prototype = Object.assign(CrEx.prototype, api);

module.exports = CrEx;