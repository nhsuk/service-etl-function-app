const request = require('request');

 // eslint-disable-next-line func-names
module.exports = function (context, myQueueItem) {
  const url = myQueueItem;

  request(url, (err, res, body) => {
    if (err) {
      context.log(`Download of ${url} encountered an error: ${err}`);
      context.done(err);
    } else if (res.statusCode === 200) {
      // eslint-disable-next-line no-param-reassign
      context.bindings.rawOrg = JSON.parse(body);
      context.done();
    } else {
      context.done(`Download of ${url} returned ${res.statusCode}`);
    }
  });
};
