const webpack = require('webpack');

module.exports = {
	entry: __dirname + '/lib/index.js',
	output: {
		filename: 'crex.js',
		path: __dirname + '/dist'
	},
	target: 'node',
	plugins: [
		new webpack.DefinePlugin({ "global.GENTLY": false })
	]
};