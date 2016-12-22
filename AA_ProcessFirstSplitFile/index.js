 // eslint-disable-next-line func-names
module.exports = function (context, odsCodesPartOne) {
  context.log('Processing odsCodesPartOne');

  // eslint-disable-next-line no-param-reassign
  context.bindings.toDownload = odsCodesPartOne;
  context.log(`A total of: ${odsCodesPartOne.length} ods codes have been sent to the queue.`);

  context.done();
};
