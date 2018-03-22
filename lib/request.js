var request = require('superagent');
var param = require('jquery-param');
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

var doGet = function (url, args, config) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.get(url), config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.buffer(true)
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			});
	});
};

var doPost = function(url, args, config) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.post(url), config.proxy)
			.auth(config.user, config.password)
			.type('form')
			.query(args)
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			});
	});
};

var doDelete = function(url, args, config) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.delete(url), config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			});
	});
};

var doUpload = function(url, args, config) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.post(url), config.proxy)
			.auth(config.user, config.password)
			.attach('file', args['file'])
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			});
	});
}

var doDownload = function(url, args, config) {
	return new Promise(function (resolve, reject) {
		checkProxy(request.get(url), config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.buffer(true)
			.parse(nodeBinaryParser)
			.end(function (err, res) {
				if (err || !res) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
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