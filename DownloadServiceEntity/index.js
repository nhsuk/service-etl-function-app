const request = require('request');

module.exports = function (context, myQueueItem) {
  const url = myQueueItem;

  request(url, (err, res, body) => {
    if (err) {
      context.log(`An error occurred during download of \n URL: ${url} \n ERROR: ${err}`);
      context.done(err);
    } else if (res.statusCode === 200) {
      context.bindings.rawOrg = JSON.parse(body);
      context.done();
    } else {
      context.done(`Non 200 response encountered during download of \n URL: ${URL}`);
    }
  });
};
