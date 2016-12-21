const request = require('request');

module.exports = function (context, myQueueItem) {
  const url = myQueueItem;

  request(url, (err, res, body) => {
    if (err) {
      context.log(`Download of ${url} encountered an error: ${err}`);
      context.done(err);
    } else if (res.statusCode === 200) {
      context.bindings.rawOrg = JSON.parse(body);
      context.done();
    } else {
      context.done(`Download of ${url} returned ${res.statusCode}`);
    }
  });
};
