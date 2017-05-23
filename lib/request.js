var request = require('superagent');

var nodeBinaryParser = function (res, done) {
	res.setEncoding('binary');
	res.text = '';
	res.on('data', function (chunk) {
		res.text += chunk;
	});
	res.on('end', function () {
		done(null, new Buffer(res.text, 'binary'));
	});
};

var doGet = function (url, args) {
	return new Promise(function (resolve, reject) {
		request
			.get(url)
			.query(args)
			.buffer(true)
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					resolve(res.body);
				}
			});
	});
};

var doPost = function(url, args) {
	return new Promise(function (resolve, reject) {
		request
			.post(url)
			.type('form')
			.send(args)
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					resolve(res.body);
				}
			});
	});
};

var doDelete = function(url, args) {
	return new Promise(function (resolve, reject) {
		request
			.delete(url)
			.query(args)
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					resolve(res.body);
				}
			});
	});
};

var doUpload = function(url, args) {
	return new Promise(function (resolve, reject) {
		request
			.post(url)
			.attach('file', args['file'])
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					resolve(res.body);
				}
			});
	});
}

var doDownload = function(url, args) {
	return new Promise(function (resolve, reject) {
		request
			.get(url)
			.query(args)
			.buffer(true)
			.parse(nodeBinaryParser)
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					resolve(res.body);
				}
			});
	});
}

module.exports = {
	doGet: doGet,
	doPost: doPost,
	doDelete: doDelete,
	doUpload: doUpload,
	doDownload: doDownload
};