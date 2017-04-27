var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var uglify = require('rollup-plugin-uglify');

module.exports = {
	entry: 'lib/index.js',
	dest: 'dist/crex-sdk.min.js',
	format: 'iife',
	moduleName: 'CrEx',
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs({
			sourceMap: false
		}),
		uglify()
	]
};