const transform = require('./transform');

 // eslint-disable-next-line func-names
module.exports = function (context, rawOrg) {
  const org = transform(rawOrg);

  // Send id of org to queue for record of what has been saved to docDB
  /* eslint-disable no-param-reassign */
  context.bindings.org = org;
  context.bindings.orgId = org.id;
  /* eslint-enable no-param-reassign */

  context.done();
};
