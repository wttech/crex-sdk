var fs = require('fs');
var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var uglify = require('rollup-plugin-uglify');

var pkg = JSON.parse(fs.readFileSync( 'package.json', 'utf-8'));

var banner = fs.readFileSync('banner.txt', 'utf-8')
	.replace( '${version}', pkg.version);

module.exports = {
	entry: 'lib/index.js',
	dest: 'dist/crex.browser.min.js',
	format: 'iife',
	banner: banner,
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