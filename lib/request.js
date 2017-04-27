var request = require('superagent');

var doGet = function (url, args) {
	return new Promise(function (resolve, reject) {
		request.get(url).end(function (err, res) {
			if (err) reject(err);
			resolve(res.body);
		});
	})
}

module.exports = {
	doGet: doGet
};