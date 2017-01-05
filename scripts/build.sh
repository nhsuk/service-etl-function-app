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
  --resource-group $resourceGroup \
  --template-file ./template.json \
  --parameters "{ \"org\": { \"value\": \"$currentOrg\" }, \"repo\": { \"value\": \"$currentRepo\" } , \"branch\": { \"value\": \"$currentBranch\" } }"

storageAccountName=`az storage account list --resource-group ${resourceGroup} --output list --query '[].name'`
storageAccountConnectionString=`az storage account show-connection-string --resource-group ${resourceGroup} --name ${storageAccountName} --query 'connectionString'`

# storageAccountKey=`az storage account keys list --resource-group ${resourceGroup} --name ${storageAccountName} --query 'keys[0].value'`
# This through an AccountName error - not sure why
# az storage container create --name ods-input --account-name $storageAccountName --account-key=$storageAccountKey

AZURE_STORAGE_CONNECTION_STRING=${storageAccountConnectionString} az storage container create --name ods-input
