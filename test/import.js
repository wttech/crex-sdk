var fs = require('fs');
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;

var CrEx = require('../lib/crex');

describe('Import', function() {
	var crex = new CrEx({
		user: 'admin',
		password: 'admin',
		url: 'localhost',
		port: 4502
	});

	describe('#getAllPackages', function() {
		it('should return list of packages', function() {
			return expect(crex.importGetAllPackages()).to.eventually.be.a('array');
		});
	});

	describe('#getPackageStatus', function() {
		it('should return list of packages', function() {
			return expect(crex.importGetPackageStatus({
				'id': '3c190d0a-91c3-4aa2-beaa-f17b5dbdd913'
			})).to.eventually.be.a('array');
		});
	});

	describe('#inspectPackage', function() {
		it('should return status', function() {
			return expect(crex.importInspectPackage({
				'id': '3c190d0a-91c3-4aa2-beaa-f17b5dbdd913'
			})).to.eventually.be.a('object');
		});
	});

	describe('#installPackage', function() {
		it('should return status', function() {
			return expect(crex.importInstallPackage({
				'id': '3c190d0a-91c3-4aa2-beaa-f17b5dbdd913'
			})).to.eventually.be.a('object');
		});
	});

	describe('#uploadPackage', function() {
		it('should upload status', function() {
			return expect(crex.importUploadPackage({
				'file': fs.createReadStream(path.resolve(__dirname, 'test.zip'))
			})).to.eventually.be.a('object');
		});
	});

	describe('#downloadPackage', function() {
		it('should upload status', function() {
			return expect(crex.importUploadPackage({
				'download': '4eb502dd-5e7a-4623-a141-e2503f8873c6'
			})).to.eventually.be.a('object');
		});
	});

	describe('#deletePackage', function() {
		it('should remove package', function() {
			return expect(crex.importRemovePackage({
				'id': '3c190d0a-91c3-4aa2-beaa-f17b5dbdd913'
			})).to.eventually.be.a('object');
		});
	});
});