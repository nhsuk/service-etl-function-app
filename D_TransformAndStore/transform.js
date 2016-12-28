const pnLib = require('google-libphonenumber');

const pnFormat = pnLib.PhoneNumberFormat;
const pnUtil = pnLib.PhoneNumberUtil.getInstance();

function transform(rawOrg) {
  // Set the id so existing entries will be updated
  // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-documentdb#output-usage
  /* eslint-disable no-param-reassign */
  rawOrg.id = rawOrg.identifier;

  const pn = pnUtil.parse(rawOrg.contacts.telephoneNumber, 'GB');

  rawOrg.contacts.telephoneNumber = pnUtil.format(pn, pnFormat.NATIONAL);

  return rawOrg;
}

module.exports = transform;
