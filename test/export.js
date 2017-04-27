var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;

var CrEx = require('../lib/crex');

describe('Export', function() {
	var crex = new CrEx({
		user: 'admin',
		password: 'admin',
		url: 'localhost',
		port: 4502
	});

	describe('#getAllPackages', function() {
		it('should return list of packages', function() {
			return expect(crex.exportGetAllPackages()).to.eventually.be.a('array');
		});
	});

	describe('#getPackageStatus', function() {
		it('should return list of packages', function() {
			return expect(crex.exportGetPackageStatus({
				'id': 'ae814a08-c438-429b-ab7a-fbd95dbe6998'
			})).to.eventually.be.a('array');
		});
	});

	describe('#deletePackage', function() {
		it('should remove package', function() {
			return expect(crex.exportRemovePackage({
				'id': 'ae814a08-c438-429b-ab7a-fbd95dbe6998'
			})).to.eventually.be.a('object');
		});
	});
});