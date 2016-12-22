 // eslint-disable-next-line func-names
module.exports = function (context, rawOrg) {
  // Set the id so existing entries will be updated
  // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-documentdb#output-usage
  /* eslint-disable no-param-reassign */
  rawOrg.id = rawOrg.identifier;
  context.bindings.org = rawOrg;

  // Send id of org to queue for record of what has been saved to docDB
  context.bindings.orgId = rawOrg.id;
  /* eslint-enable no-param-reassign */
  context.done();
};
