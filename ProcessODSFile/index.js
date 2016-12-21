module.exports = function (context, odsDataFile) {
  context.log('JavaScript blob trigger function processed blob \n Name:', context.bindingData.odaDataFile, '\n Blob Size:', odsDataFile.length, 'Bytes');

  const odsCodes = [];

  odsDataFile.split('\n').map((line) => {
    const columns = line.split(',');
    const active = columns[12];
    const orgSubType = columns[13];

    if (active === 'A' && orgSubType === 1) {
      odsCodes.push({
        'odsCode': columns[0],
        'orgType': 'pharmacy',
      });
    }
  });

  context.bindings.odsCodes = odsCodes;
  context.log(`A total of: ${odsCodes.length} ods codes have been sent to the queue.`);

  context.done();
};
