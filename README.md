# Service data ETL function collection

Running in Azure as a [function app](https://azure.microsoft.com/en-gb/services/functions/)
this repo is a collection of functions that start executing when a file is
uploaded to a container in blob storage.

At the moment the functions only support the work flow for the `edispensary.csv`
file, extracted from [edispensary.zip](https://digital.nhs.uk/media/390/edispensary/zip/edispensary)
which is available from [GP and GP practice related data](https://digital.nhs.uk/organisation-data-service/data-downloads/gp-data)

## Work flow

The work flow is to extract the ODS codes from the file and add them to a queue.
Once on the queue they are picked up and assessed to understand which data-source
the wider set of data should be retreieved from. This varies based on the org type
which is part of the message.
During the data source assessment the URL required to download the resource
from is constructed and placed on another queue. That queue 'the to download'
queue is picked up by a function dedicated to downloading resources.
As the resources are downloaded they are placed on another queue where they will
be picked up from by a function whose job it is to transform the raw resource
into a consistent model that is placed on another queue.
The final queue. Each item on the queue will be written to a document DB instance.

