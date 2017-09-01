var request = require('./request');
var api = {};

/**
 * Get list of all Creative Exchange export packages. These packages contains package id
 * which can later be used for accessing package status or downloading it
 * @function CrEx#exportGetAllPackages
 * @arg {Object} args
 * @arg {number} [args.page] - Number of page containing 20 items
 * @returns {Promise.<ExportGetPackageResults, Error.<RequestError>>}
 */
api.exportGetAllPackages = function (args) {
	return this.request('GET', '/etc/creativeExchange/export/api.packages.json', args);
};

/**
 * Get status of the package. During exporting package can have status IN_PROGRESS or DONE
 * indicating if package is still exporting or if can be downloaded
 * @function CrEx#exportGetPackageStatus
 * @arg {Object} args
 * @arg {String} args.id - Package id
 * @returns {Promise}
 */
api.exportGetPackageStatus = function (args) {
	return this.request('GET', '/etc/creativeExchange/export/api.status.json', args);
};

/**
 * Download export package as .zip file.
 * @function CrEx#exportDownloadPackage
 * @arg {Object} args
 * @arg {String} args.id - Package id
 * @returns {Promise}
 */
api.exportDownloadPackage = function (args) {
	return this.request('DOWNLOAD', '/etc/creativeExchange/export/api.package.zip', args);
};

/**
 * Creates Creative Exchange export package containing site content and referenced theme
 * @function CrEx#exportCreatePackage
 * @arg {Object} args
 * @arg {Array.<string>} args.roots - Content roots
 * @arg {boolean} args.force - Force
 * @arg {string} args.engine - Engine
 * @arg {boolean} [args.synchronous] -
 * @returns {Promise}
 */
api.exportCreatePackage = function (args) {
	return this.request('POST', '/etc/creativeExchange/export/api.create.json', args);
};

/**
 * Removes package from instance
 * @function CrEx#exportRemovePackage
 * @arg {Object} args
 * @arg {String} args.id - Package id
 * @returns {Promise}
 */
api.exportRemovePackage = function (args) {
	return this.request('DELETE', '/etc/creativeExchange/export/api.packages.json', args);
};

/**
 * Get list of all import packages. These packages contains package id
 * which can later be used for accessing package status, downloading it or installing
 * @function CrEx#importGetAllPackages
 * @arg {Object} args
 * @arg {number} [args.page] - Number of page containing 20 items
 * @returns {Promise.<ExportGetPackageResults, Error.<RequestError>>}
 */
api.importGetAllPackages = function (args) {
	return this.request('GET', '/etc/creativeExchange/import/api.packages.json', args);
};

/**
 * Get status of the package. During importing package can have status IN_PROGRESS or DONE
 * indicating if package is still importing or if can be downloaded
 * @function CrEx#importGetPackageStatus
 * @arg {Object} args
 * @arg {String} args.id - Package id
 * @returns {Promise}
 */
api.importGetPackageStatus = function (args) {
	return this.request('GET', '/etc/creativeExchange/import/api.status.json', args);
};

/**
 * Upload package to an instance
 * @function CrEx#importUploadPackage
 * @arg {Object} args
 * @arg {String} args.file - Binary representation of .zip package
 * @returns {Promise}
 */
api.importUploadPackage = function (args) {
	return this.request('UPLOAD', '/etc/creativeExchange/import/api.upload.json', args);
};

/**
 * Download the import package as .zip file.
 * @function CrEx#importDownloadPackage
 * @arg {Object} args
 * @arg {String} args.id - Package id
 * @returns {Promise}
 */
api.importDownloadPackage = function (args) {
	return this.request('DOWNLOAD', '/etc/creativeExchange/import/api.package.zip', args);
};

/**
 * Inspect package. Inspect allows for checking what changes will install make without actual
 * change of theme or content or instance
 * @function CrEx#importInspectPackage
 * @arg {Object} args
 * @arg {String} args.id - Package id
 * @returns {Promise}
 */
api.importInspectPackage = function (args) {
	return this.request('POST', '/etc/creativeExchange/import/api.inspect.json', args);
};

/**
 * Install package. Modifies theme and adds new variants.
 * @function CrEx#importInstallPackage
 * @arg {Object} args
 * @arg {String} args.id - Package id
 * @returns {Promise}
 */
api.importInstallPackage = function (args) {
	return this.request('POST', '/etc/creativeExchange/import/api.install.json', args);
};

/**
 * Removes package from instance
 * @function CrEx#importRemovePackage
 * @arg {Object} args
 * @arg {String} args.id - Package id
 * @returns {Promise}
 */
api.importRemovePackage = function (args) {
	return this.request('DELETE', '/etc/creativeExchange/import/api.packages.json', args);
};

/**
 * Get list of all themes.
 * @function CrEx#themesGetAllThemes
 * @arg {Object} args
 * @arg {number} [args.page] - Number of page containing 20 items
 * @returns {Promise}
 */
api.themesGetAllThemes = function (args) {
	return this.request('GET', '/etc/creativeExchange/themes/api.json', args);
};

/**
 * Returns progress of theme activation
 * @function CrEx#themesCheckActivateProgress
 * @arg {Object} args
 * @arg {string} args.id - Theme id
 * @returns {Promise}
 */
api.themesCheckActivateProgress = function (args) {
	return this.request('GET', '/etc/creativeExchange/themes/api.activate.json', args);
};

/**
 * Activate selected themes to publish instance
 * @function CrEx#themesActivateThemes
 * @arg {Object} args
 * @arg {Array.<string>} args.themes - Stringified list of theme paths
 * @returns {Promise}
 */
api.themesActivateThemes = function (args) {
	return this.request('POST', '/etc/creativeExchange/themes/api.activate.json', args);
};

/**
 * Create new theme
 * @function CrEx#themesCreateTheme
 * @arg {Object} args
 * @arg {string} args.themeName - Name of new theme
 * @arg {string} [args.parentThemePath] - Parent theme
 * @arg {boolean} [args.protectedTheme] - Protected theme
 * @arg {boolean} [args.finalTheme] - Final theme
 * @returns {Promise}
 */
api.themesCreateTheme = function (args) {
	return this.request('POST', '/etc/creativeExchange/themes/api.create.json', args);
};

/**
 * Removes themes from instance
 * @function CrEx#themesDeleteTheme
 * @arg {Object} args
 * @arg {Array.<string>} args.themes - Theme paths
 * @returns {Promise}
 */
api.themesDeleteThemes = function (args) {
	return this.request('POST', '/etc/creativeExchange/themes/api.delete.json', args);
};

/**
 * Downloads theme in CRX package format
 * @function CrEx#themesExportThemes
 * @arg {Object} args
 * @arg {Array.<string>} args.themes - Theme paths
 * @returns {Promise}
 */
api.themesExportThemes = function (args) {
	return this.request('DOWNLOAD', '/etc/creativeExchange/themes/api.export.zip', args);
};

/**
 * Get details about theme
 * @function CrEx#themesGetDetails
 * @arg {Object} args
 * @arg {Array.<string>} args.name - Theme name
 * @returns {Promise}
 */
api.themesGetDetails = function(args) {
	return this.request('GET', '/etc/creativeExchange/themes/api.view.json', args);
};

module.exports = api;