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

module.exports = api;