var fs = require('fs');
var webpack = require('webpack');

var pkg = JSON.parse(fs.readFileSync( 'package.json', 'utf-8'));

var banner = fs.readFileSync('banner.txt', 'utf-8')
	.replace( '${version}', pkg.version);

module.exports = {
	entry: __dirname + '/lib/index.js',
	output: {
		filename: 'crex-sdk.min.js',
		library: 'CrEx',
		libraryTarget: 'umd',
		path: __dirname + '/dist'
	},
	plugins: [
		new webpack.BannerPlugin(banner)
	]
};