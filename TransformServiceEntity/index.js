module.exports = function (context, myQueueItem) {
  const rawOrg = myQueueItem;

  // TODO: Clean up the data

  context.log('Placeholder for some data transformation. Just pushing it onto the queue for insertion...');
  context.done();
};
