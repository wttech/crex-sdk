var request = require('superagent');
require('superagent-proxy')(request);

var checkProxy = function(req, proxy) {
	return proxy ? req.proxy(proxy) : req;
};

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

var doGet = function (url, args, proxy) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.get(url), proxy)
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

var doPost = function(url, args, proxy) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.post(url), proxy)
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

var doDelete = function(url, args, proxy) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.delete(url), proxy)
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

var doUpload = function(url, args, proxy) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.post(url), proxy)
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

var doDownload = function(url, args, proxy) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.get(url), proxy)
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