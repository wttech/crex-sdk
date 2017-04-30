/**
 * @typedef {string} PackageStatus - Export or import status. Has value of "IN_PROGRESS", "ABORTED" or "DONE"
 */

/**
 * @typedef {string} RootPagePath - Path to exported package content. Must be at least on language level.
 */

/**
 * @typedef {Object} RequestError - Superagent request error
 */

/**
 * @typedef {Object} ExportGetPackageResults
 * @property {Array.<ExportGetPackageResult>} packages
 */

/**
 * @typedef {Object} ExportGetPackageResult
 * @property {string} id - Package id
 * @property {Array.<RootPagePath>} rootPagePaths - Content source of the package
 * @property {string} engineName - Export engine. Zen Garden provides "Simple" other can be created as extensions
 * @property {string} siteGroup - Selected Site Group
 * @property {string} lastModified - Last modified date
 * @proprety {string} lastModifiedBy - Username who last modified
 * @property {PackageStatus} status - Package status
 * @property {string} packagePath - Absolute path to package in CRX repository
 */

/**
 * @typedef {Object} ThemeDetails
 * @property {Array.<string>} hierarchy
 * @property {Object} mainTheme
 * @property {string} mainTheme.path
 * @property {string} mainTheme.name
 * @property {string} mainTheme.title
 * @property {boolean} mainTheme.protectedTheme
 */