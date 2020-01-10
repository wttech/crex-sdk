const baseUrl = '/apps/creative-exchange/web-api'
const api = {};

/**
 * Get status of the package. During importing package can have status IN_PROGRESS or DONE
 * indicating if package is still importing or if can be downloaded
 * @function CrEx#getPackageStatus
 * @arg {Object} args
 * @arg {string} [args.packageId] - ID of the package. Must be a valid UUID string
 * @returns {Promise, Error.<RequestError>>}
 */
api.getPackageStatus = function (args) {
	return this.request('GET', `${baseUrl}/status.json`, args);
};

/**
 * Get list of all Creative Exchange packages. These packages contains package id
 * which can later be used for accessing package status or downloading it
 * @function CrEx#getAllPackages
 * @arg {Object} args
 * @arg {number} [args.page=1] - Desired page number
 * @arg {number} [args.perPage=10] - Number of result per page
 * @returns {Promise, Error.<RequestError>>}
 */
api.getPackageList = function (args) {
	return this.request('GET', `${baseUrl}/packages.json`, args);
};

/**
 * Create Creative Exchange packages.
 * @function CrEx#createPackage
 * @arg {Object} args
 * @arg {string} [args.rootPath] - Unique root path of the package
 * @arg {string} [args.name=] - Custom name of the package
 * @returns {Promise, Error.<RequestError>>}
 */

api.createPackage = function (args) {
	return this.request('POST', `${baseUrl}/create.json`, args);
};

/**
 * Trigger the package build process. Overwrites previously generated ZIP file for a package.
 * Progress of the package build process should be checked using the CrEx#GetPackageStatus.
 * @function CrEx#buildPackage
 * @arg {Object} args
 * @arg {string} [args.packageId] - ID of the package. Must be a valid UUID string
 * @arg {boolean} [args.synchronous=false] - Decides if the request should wait for the package build process to complete
 * @returns {Promise, Error.<RequestError>>}
 */
api.buildPackage = function (args) {
	return this.request('POST', `${baseUrl}/build.json`, args);
};

/**
 * Download export package as .zip file.
 * @function CrEx#downloadPackage
 * @arg {Object} args
 * @arg {string} [args.packageId] - ID of the package. Must be a valid UUID string
 * @returns {Promise, Error.<RequestError>>}
 */
api.downloadPackage = function (args) {
	return this.request('DOWNLOAD', `${baseUrl}/download`, args);
};

/**
 * Removes package from instance
 * @function CrEx#deletePackage
 * @arg {Object} args
 * @arg {string} [args.packageId] - ID of the package. Must be a valid UUID string
 * @returns {Promise, Error.<RequestError>>}
 */
api.deletePackage = function (args) {
	return this.request('DELETE', `${baseUrl}/package.json`, args);
};

/**
 * Upload package from instance
 * @function CrEx#uploadPackage
 * @arg {Object} args
 * @arg {string} [args.file] - Package file as a ZIP. Must be a valid ZIP file.	
 * @returns {Promise, Error.<RequestError>>}
 */
api.uploadPackage = function (args) {
	return this.request('UPLOAD', `${baseUrl}/upload.json`, args);
};

/**
 * Install package. Modifies theme and adds new variants.
 * @function CrEx#installPackage
 * @arg {Object} args
 * @arg {string} [args.packageId] - ID of the package. Must be a valid UUID string
 * @returns {Promise, Error.<RequestError>>}
 */
api.installPackage = function (args) {
	return this.request('POST', `${baseUrl}/install.json`, args);
};

module.exports = api;