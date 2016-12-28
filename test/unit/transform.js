const transform = require('../../D_TransformAndStore/transform');
const chai = require('chai');

const expect = chai.expect;

describe('Transform', () => {
  const baseOrg = {
    identifier: 'ABC12',
    contacts: { telephoneNumber: '01234567890' },
  };

  describe('identifier behaviour', () => {
    it('should copy the identifier to the id property', () => {
      const transformedOrg = transform(baseOrg);

      const id = transformedOrg.id;

      expect(id).to.not.equal(undefined);
      expect(id).to.equal(baseOrg.identifier);
    });
  });

  describe('telephoneNumber formatting', () => {
    it('should format a mobile telephoneNumber', () => {
      baseOrg.contacts.telephoneNumber = '07700900075';

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('07700 900075');
    });

    it('should format a freephone telephoneNumber', () => {
      baseOrg.contacts.telephoneNumber = '08081570773';

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('0808 157 0773');
    });

    it('should format a premium rate telephoneNumber', () => {
      baseOrg.contacts.telephoneNumber = '09098790529';

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('0909 879 0529');
    });

    it('should format a London telephoneNumber', () => {
      baseOrg.contacts.telephoneNumber = '02079460628';

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('020 7946 0628');
    });

    it('should format a UK wide telephoneNumber', () => {
      baseOrg.contacts.telephoneNumber = '03069990430';

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.equal('0306 999 0430');
    });
  });

  describe('imperfect data', () => {
    it('should not format the telephoneNumber when it is empty', () => {
      baseOrg.contacts.telephoneNumber = '';

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.be.equal('');
    });

    it('should not format the telephoneNumber when it is null', () => {
      baseOrg.contacts.telephoneNumber = null;

      const transformedOrg = transform(baseOrg);

      expect(transformedOrg.contacts.telephoneNumber).to.be.equal(null);
    });
  });
});
