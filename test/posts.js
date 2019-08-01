var fs = require('fs');
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;

var CrEx = require('../lib/crex');

describe('CrEx', function() {
	var crex = new CrEx({
		user: 'admin',
		password: 'admin',
		url: 'localhost',
		port: 4502
	});

	describe('#buildPackage', function() {
		it('should build package', function() {
			return expect(crex.buildPackage({
				'packageId': '4731bd1f-876b-4879-b27a-fb58d6d2248f'
			})).to.eventually.be.a('object');
		});
	});

	describe('#uploadPackage', function() {
		it('should return list of packages', function() {
			return expect(crex.getPackageList()).to.eventually.be.a('array');
		});
	});

	describe('#uploadPackage', function() {
		it('should upload package', function() {
			return expect(crex.uploadPackage({
				'file': fs.createReadStream(path.resolve(__dirname, 'test-package.zip'))
			})).to.eventually.be.a('object');
		});
	});
	
	describe('#installPackage', function() {
		it('should install package', function() {
			return expect(crex.installPackage({
				'packageId': '4731bd1f-876b-4879-b27a-fb58d6d2248f'
			})).to.eventually.be.a('object');
		});
	});
	
	describe('#createPackage and #deletePackage', function() {
		it('should create package and delete it', function() {
			var request = new Promise(function(resolve, reject) {
				crex.createPackage({
					'rootPath': '/content/we-retail/us/en/user/cart'
				})
				.then(function (res)  {
					// TODO
					// There is a problem with new CE api, we cannot delete the package immediately after creation.
					// When we try even though we have `packageId`, `delete` request will fail.
					setTimeout(function() {
						crex.deletePackage({
							'packageId': res.packageId
						})
						.then(function(res) {
							resolve(res)
						})
						.catch((err) => {
							if (err) reject(err);
						});
					}, 1000);
				})
				.catch((err) => {
					if (err) reject(err);
				});
			})
			
			return expect(request).to.eventually.be.a('object')
		});
	});
});