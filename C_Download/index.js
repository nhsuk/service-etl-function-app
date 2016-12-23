const request = require('request');

 // eslint-disable-next-line func-names
module.exports = function (context, myQueueItem) {
  const url = myQueueItem;

  request(url, (err, res, body) => {
    if (err) {
      context.log(`Download of ${url} encountered an error: ${err}`);
      context.done(err);
    } else {
      switch (res.statusCode) {
        case 200:
          // eslint-disable-next-line no-param-reassign
          context.bindings.org = JSON.parse(body);
          break;
        case 404:
          // eslint-disable-next-line no-param-reassign
          context.bindings.notFound = url;
          break;
        case 500:
          // eslint-disable-next-line no-param-reassign
          context.bindings.errored = url;
          break;
        default:
          context.done(`Download of ${url} returned ${res.statusCode}`);
      }
      context.done();
    }
  });
};
