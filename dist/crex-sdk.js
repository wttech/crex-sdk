(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.CrEx = factory());
}(this, (function () { 'use strict';

var api = {};
var request = function (arg) {};

api.exportGetAllPackages = function (arg) {
	request('/etc/creativeExchange/export/api.packages.json');
};

api.exportGetPackageStatus = function (arg) {
	request('/etc/creativeExchange/export/api.status.json');
};

api.exportDownloadPackage = function (arg) {
	request('/etc/creativeExchange/export/api.package.zip');
};

api.exportCreatePackage = function (arg) {
	request('/etc/creativeExchange/export/api.create.json');
};

api.exportRemovePackage = function (arg) {
	request('/etc/creativeExchange/export/api.packages.json');
};

api.importGetAllPackages = function (arg) {
	request('/etc/creativeExchange/import/api.packages.json');
};

api.importGetPackageStatus = function (arg) {
	request('/etc/creativeExchange/import/api.status.json');
};

api.importUploadPackage = function (arg) {
	request('/etc/creativeExchange/import/api.upload.json');
};

api.importInspectPackage = function (arg) {
	request('/etc/creativeExchange/import/api.inspect.json');
};

api.importDryRunPackage = function (arg) {
	request('/etc/creativeExchange/import/api.dry_run.json');
};

api.importInstallPackage = function (arg) {
	request('/etc/creativeExchange/import/api.install.json');
};

api.importRemovePackage = function (arg) {
	request('/etc/creativeExchange/import/api.packages.json');
};

api.themeGetAllThemes = function (arg) {
};

var api_1 = api;

var CrEx = function (options) {
	options = options || {};
	this.admin = options.admin;
	this.password = options.password;
	this.server = options.server;
	this.port = options.port;
};

CrEx.prototype = Object.assign(CrEx.prototype, api_1);

var crex = CrEx;

var index = crex;

return index;

})));
