 // eslint-disable-next-line func-names
module.exports = function (context, odsDataFile) {
  context.log(context);

  const odsCodesPartOne = [];
  const odsCodesPartTwo = [];

  const lines = odsDataFile.split('\n');
  const halfWay = Math.round(lines.length / 2);
  let i;

  context.log('halfWay: ' + halfWay);
  for (i = 0; i < lines.length; i++) {
    const columns = lines[i].split(',');
    const active = columns[12];
    const orgSubType = columns[13];

    if (active === 'A' && orgSubType === '1') {
      const org = { odsCode: columns[0], orgType: 'pharmacy' };

      if (i < halfWay) {
        context.log('First half' + org);
        odsCodesPartOne.push(org);
      } else {
        context.log('Second half' + org);
        odsCodesPartTwo.push(org);
      }
    }
  }

  /* eslint-disable no-param-reassign */
  context.bindings.odsCodesPartOne = odsCodesPartOne;
  context.bindings.odsCodesPartTwo = odsCodesPartTwo;
  /* eslint-enable no-param-reassign */

  const totalItems = odsCodesPartOne.length + odsCodesPartTwo.length;
  context.log(`A total of: ${totalItems} ods codes have been sent to the queue.`);

  context.done();
};
