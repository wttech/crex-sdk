import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const expect = chai.expect;
import CrEx from '../src/lib/crex';

xdescribe('CrEx', () => {
	const crex = new CrEx({
		user: 'admin',
		password: 'admin',
		url: 'localhost',
	});

	describe('#getPackageStatus', () => {
		it('should return package information', () => {
			return expect(crex.getPackageStatus({
				'packageId': '4731bd1f-876b-4879-b27a-fb58d6d2248f'
			})).to.eventually.be.a('object');
		});
	});

	describe('#getPackageList', () => {
		it('should return list of packages', () => {
			return expect(crex.getPackageList()).to.eventually.be.a('array');
		});
	});

	xdescribe('#downloadPackage', () => {
		it('should download package', () => {
			return expect(crex.downloadPackage({
				'packageId': 'fbf74a5d-1301-426d-a5aa-4d5899ff86fd'
			})).to.eventually.be.instanceof(Buffer)
		});
	});
});