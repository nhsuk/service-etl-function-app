functionName=services-etl
timeStamp=`date "+%Y%m%d%H%M%S"`
baseName=`whoami`-dev-${functionName}-${timeStamp}
resourceGroup=${baseName}
region=uksouth

azure group create $resourceGroup $region
azure group deployment create --resource-group $resourceGroup --template-file ./template.json #--parameters-file ./parameters.json
