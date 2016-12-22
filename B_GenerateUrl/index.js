 // eslint-disable-next-line func-names
module.exports = function (context, odsOrg) {
  if (odsOrg.orgType === 'pharmacy') {
    // eslint-disable-next-line no-param-reassign
    context.bindings.toDownload = `https://api.nhs.uk/organisations/${odsOrg.odsCode}`;
  }

  context.done();
};
