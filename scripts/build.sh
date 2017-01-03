functionName=services-etl-1
baseName=`whoami`-dev-${functionName}
resourceGroup=${baseName}
region=uksouth

azure group create $resourceGroup $region
azure group deployment create --resource-group $resourceGroup --template-file ./template.json #--parameters-file ./parameters.json
