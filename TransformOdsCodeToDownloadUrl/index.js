module.exports = function (context, myQueueItem) {
  if (myQueueItem.orgType === 'pharmacy') {
    context.bindings.toDownload = `https://api.nhs.uk/organisations/${myQueueItem.odsCode}`;
  }

  context.done();
};
