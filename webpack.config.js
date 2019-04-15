const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
	entry: __dirname + '/lib/index.js',
	output: {
		filename: 'crex.js',
		path: __dirname + '/dist'
	},
	mode: 'production',
	target: 'node',
	plugins: [
		new webpack.BannerPlugin({
			banner: `CrEx.js \n v${packageJson.version} https://github.com/mateuszluczak/crex \n Released under the MIT License.`,
		}),
		new webpack.DefinePlugin({ "global.GENTLY": false })
	]
};