var request = require('./request');
var api = {};

api.exportGetAllPackages = function () {
	return this.request('GET', '/etc/creativeExchange/export/api.packages.json');
};

api.exportGetPackageStatus = function (args) {
	return this.request('GET', '/etc/creativeExchange/export/api.status.json', args);
};

api.exportDownloadPackage = function (args) {
	return this.request('DOWNLOAD', '/etc/creativeExchange/export/api.package.zip', args);
};

api.exportCreatePackage = function (args) {
	return this.request('POST', '/etc/creativeExchange/export/api.create.json', args);
};

api.exportRemovePackage = function (args) {
	return this.request('DELETE', '/etc/creativeExchange/export/api.packages.json', args);
};

api.importGetAllPackages = function () {
	return this.request('GET', '/etc/creativeExchange/import/api.packages.json');
};

api.importGetPackageStatus = function (args) {
	return this.request('GET', '/etc/creativeExchange/import/api.status.json', args);
};

api.importUploadPackage = function (args) {
	return this.request('UPLOAD', '/etc/creativeExchange/import/api.upload.json', args);
};

api.importDownloadPackage = function (args) {
	return this.request('DOWNLOAD', '/etc/creativeExchange/import/api.package.zip', args);
};

api.importInspectPackage = function (args) {
	return this.request('POST', '/etc/creativeExchange/import/api.inspect.json', args);
};

api.importDryRunPackage = function (args) {
	return this.request('POST', '/etc/creativeExchange/import/api.dry_run.json', args);
};

api.importInstallPackage = function (args) {
	return this.request('POST', '/etc/creativeExchange/import/api.install.json', args);
};

api.importRemovePackage = function (args) {
	return this.request('DELETE', '/etc/creativeExchange/import/api.packages.json', args);
};

api.themesGetAllThemes = function (args) {
	return this.request('GET', '/etc/creativeExchange/themes/api.json', args);
};

api.themesCheckProgress = function (args) {
	return this.request('GET', '/etc/creativeExchange/themes/api.json', args);
};

module.exports = api;