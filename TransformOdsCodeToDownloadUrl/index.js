module.exports = function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);

    if (myQueueItem.orgType === 'pharmacy') {
        context.bindings.toDownload = `https://api.nhs.uk/organisations/${myQueueItem.odsCode}`;
    }

    context.done();
};
