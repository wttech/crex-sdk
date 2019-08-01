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

	describe('#getPackageStatus', function() {
		it('should return package information', function() {
			return expect(crex.getPackageStatus({
				'packageId': '4731bd1f-876b-4879-b27a-fb58d6d2248f'
			})).to.eventually.be.a('object');
		});
	});

	describe('#getPackageList', function() {
		it('should return list of packages', function() {
			return expect(crex.getPackageList()).to.eventually.be.a('array');
		});
	});

	describe('#downloadPackage', function() {
		it('should download package', function() {
			return expect(crex.downloadPackage({
				'packageId': 'fbf74a5d-1301-426d-a5aa-4d5899ff86fd'
			})).to.eventually.be.instanceof(Buffer)
		});
	});
});