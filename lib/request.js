const request = require('superagent');

const nodeBinaryParser = (res, done) => {
	res.setEncoding('binary');
	res.text = '';
	res.on('data', (chunk) => {
		res.text += chunk;
	});
	res.on('end', () => {
		done(null, new Buffer(res.text, 'binary'));
	});
};

const doGet = (url, args, config) => {
	return new Promise((resolve, reject) => {
		request.get(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.buffer(true)
			.end((err, res) => {
				if (err || !res || !Object.keys(res.body).length) {
					reject(err);
				} else {
					if (res.body.status === 'Error') {
						reject('Error: ' + res.body.message);
					}
					resolve(res.body);
				}
			})
	});
};

const doPost = (url, args, config) => {
	return new Promise((resolve, reject) => {
		request.post(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.type('form')
			.query(args)
			.end((err, res) => {
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

const doDelete = (url, args, config) => {
	return new Promise((resolve, reject) => {
		request.delete(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.end((err, res) => {
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

const doUpload = (url, args, config) => {
	return new Promise((resolve, reject) => {
		request.post(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.attach('file', args['file'])
			.end((err, res) => {
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

const doDownload = (url, args, config) => {
	return new Promise((resolve, reject) => {
		request.get(url)
			.connect(config.proxy)
			.auth(config.user, config.password)
			.query(args)
			.buffer(true)
			.parse(nodeBinaryParser)
			.end((err, res) => {
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