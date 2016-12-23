# Service data ETL function collection

Running in Azure as a [function app](https://azure.microsoft.com/en-gb/services/functions/)
this repo is a collection of functions that start executing when a file is
uploaded to a container in blob storage.

At the moment the functions only support the work flow for the `edispensary.csv`
file, extracted from [edispensary.zip](https://digital.nhs.uk/media/390/edispensary/zip/edispensary)
which is available from [GP and GP practice related data](https://digital.nhs.uk/organisation-data-service/data-downloads/gp-data)

## Work flow

Briefly, the flow of the application is:

1. When a file containing ODS codes is uploaded to blob storage
1. Extract the ODS codes
1. Based on the type of org, work out the best source of data
1. Download the data
1. Store the data

## Monitoring

There are many information points available in order to understand and monitor
what is happening with during the execution of the functions. I have found a
good place to start is the live monitoring web page for each of the functions.

Every function has a page that is accessed by replacing the name of the app
and the name of the function with the one wishing to be monitored. For example
https://support-bay.scm.azurewebsites.net/Support.functionsmetrics/#/services-etl/A_SplitFile
is a page to monitor the function `A_SplitFile`.

In addition to the live execution metric page, logs are available at
https://{app-name}.scm.azurewebsites.net/api/logstream where `{app-name}` is
the name of the function app.

It is also worth checking the queues to see how things are progressing. One
way the queues are can monitored is through the [Azure Storage Explorer](http://storageexplorer.com/).
