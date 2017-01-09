functionName=services-etl
timeStamp=`date "+%Y%m%d%H%M%S"`
baseName=`whoami`-dev-${functionName}-${timeStamp}
resourceGroup=${baseName}
region=uksouth
currentRepoPath=`git rev-parse --show-toplevel`
currentOrg=`git remote get-url origin | cut -f4 -d"/"`
currentRepo=`git remote get-url origin | cut -f5 -d"/" | cut -f1 -d'.'`
currentBranch=`git rev-parse --abbrev-ref HEAD`

echo "Creating infrastructure for ${currentOrg}/${currentRepo}/${currentBranch}" 

az group create \
  --name $resourceGroup \
  --location $region \
  --tags org=$currentOrg repo=$currentRepo branch=$currentBranch
az group deployment create \
  --name "scripted-deployment-${timeStamp}" \
  --resource-group $resourceGroup \
  --template-file ./master-template.json \
  --parameters "{ \"org\": { \"value\": \"$currentOrg\" }, \"repo\": { \"value\": \"$currentRepo\" } , \"branch\": { \"value\": \"$currentBranch\" } }"

storageAccountName=`az storage account list --resource-group ${resourceGroup} --output list --query '[].name'`
storageAccountConnectionString=`az storage account show-connection-string --resource-group ${resourceGroup} --name ${storageAccountName} --query 'connectionString'`

az storage container create --name ods-input --connection-string=${storageAccountConnectionString}
az storage container create --name ods-split --connection-string=${storageAccountConnectionString}
