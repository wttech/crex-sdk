var commonjs = require('rollup-plugin-commonjs');

module.exports = {
	entry: 'lib/index.js',
	dest: 'dist/crex-sdk.js',
	format: 'umd',
	moduleName: 'CrEx',
	plugins: [
		commonjs({
			sourceMap: false
		})
	]
};