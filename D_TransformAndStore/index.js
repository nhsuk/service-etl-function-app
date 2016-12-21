module.exports = function (context, myQueueItem) {
  const rawOrg = myQueueItem;

  context.log('Placeholder for some data transformation.');
  // TODO: Clean up/transform the data

  context.bindings.org = rawOrg;
  context.done();
};
