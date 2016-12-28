const transform = require('../../D_TransformAndStore/transform');
const chai = require('chai');

const expect = chai.expect;

describe('Transform', () => {
  const baseOrg = {
    identifier: 'ABC12',
    contacts: { telephoneNumber: '01234567890' },
  };

  describe('identifier actions', () => {
    it('should copy the identifier to the id property', () => {
      const transformedOrg = transform(baseOrg);

      const id = transformedOrg.id;

      expect(id).to.not.equal(undefined);
      expect(id).to.equal(baseOrg.identifier);
    });
  });

  describe('telephoneNumber formatting', () => {
    it('should format a mobile telephoneNumber', () => {
      const mobilePhoneNumber = '07700900075';
      baseOrg.contacts.telephoneNumber = mobilePhoneNumber;

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('07700 900075');
    });

    it('should format a freephone telephoneNumber', () => {
      const freePhoneNumber = '08081570773';
      baseOrg.contacts.telephoneNumber = freePhoneNumber;

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('0808 157 0773');
    });

    it('should format a premium rate telephoneNumber', () => {
      const premiumRatePhoneNumber = '09098790529';
      baseOrg.contacts.telephoneNumber = premiumRatePhoneNumber;

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('0909 879 0529');
    });

    it('should format a London telephoneNumber', () => {
      const londonPhoneNumber = '02079460628';
      baseOrg.contacts.telephoneNumber = londonPhoneNumber;

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('020 7946 0628');
    });

    it('should format a UK wide telephoneNumber', () => {
      const ukWidePhoneNumber = '03069990430';
      baseOrg.contacts.telephoneNumber = ukWidePhoneNumber;

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('0306 999 0430');
    });
  });
});
