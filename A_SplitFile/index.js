const parse = require('csv-parse');

// eslint-disable-next-line func-names
module.exports = function (context, odsDataFile) {
  const odsCodesPartOne = [];
  const odsCodesPartTwo = [];

  parse(odsDataFile, (err, output) => {
    if (err) {
      context.done(err);
    }

    const numberOfRecords = output.length;
    const halfWay = Math.round(numberOfRecords / 2);
    let i;

    for (i = 0; i < numberOfRecords; i++) {
      const record = output[i];
      const active = record[12];
      const orgSubType = record[13];

      if (active === 'A' && orgSubType === '1') {
        const org = { odsCode: record[0], orgType: 'pharmacy' };

        if (i < halfWay) {
          odsCodesPartOne.push(org);
        } else {
          odsCodesPartTwo.push(org);
        }
      }
    }

    /* eslint-disable no-param-reassign */
    context.bindings.odsCodesPartOne = JSON.stringify(odsCodesPartOne);
    context.bindings.odsCodesPartTwo = JSON.stringify(odsCodesPartTwo);
    /* eslint-enable no-param-reassign */

    const totalItems = odsCodesPartOne.length + odsCodesPartTwo.length;
    context.log(`A total of: ${totalItems} ods codes have been processed.`);

    context.done();
  });
};
