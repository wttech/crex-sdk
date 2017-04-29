var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;

var CrEx = require('../lib/crex');

describe('Themes', function() {
	var crex = new CrEx({
		user: 'admin',
		password: 'admin',
		url: 'localhost',
		port: 4502
	});

	describe('#getAllThemes', function() {
		it('should return list of themes', function() {
			return expect(crex.themesGetAllThemes()).to.eventually.be.a('array');
		});
	});
});