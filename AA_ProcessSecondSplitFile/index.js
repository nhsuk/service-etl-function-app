 // eslint-disable-next-line func-names
module.exports = function (context, odsCodesPartTwo) {
  context.log('Processing odsCodesPartTwo');

  // eslint-disable-next-line no-param-reassign
  context.bindings.toDownload = odsCodesPartTwo;
  context.log(`A total of: ${odsCodesPartTwo.length} ods codes have been sent to the queue.`);

  context.done();
};
