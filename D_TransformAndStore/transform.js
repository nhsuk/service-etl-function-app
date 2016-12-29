const pnLib = require('google-libphonenumber');

const pnFormat = pnLib.PhoneNumberFormat;
const pnUtil = pnLib.PhoneNumberUtil.getInstance();

function transform(rawOrg) {
  // Set the id so existing entries will be updated
  // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-documentdb#output-usage
  /* eslint-disable no-param-reassign */
  rawOrg.id = rawOrg.identifier;

  let updatedTelephoneNumber = null;
  const rawTelephoneNumber = rawOrg.contacts.telephoneNumber;

  if (rawTelephoneNumber !== null && rawTelephoneNumber.trim() !== '') {
    const pn = pnUtil.parse(rawTelephoneNumber, 'GB');
    updatedTelephoneNumber = pnUtil.format(pn, pnFormat.NATIONAL);
  }

  rawOrg.contacts.telephoneNumber = updatedTelephoneNumber;

  return rawOrg;
}

module.exports = transform;
