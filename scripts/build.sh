functionName=services-etl
timeStamp=`date "+%Y%m%d%H%M%S"`
baseName=`whoami`-dev-${functionName}-${timeStamp}
resourceGroup=${baseName}
region=uksouth
currentRepoPath=`git rev-parse --show-toplevel`
currentOrg=`git remote get-url origin | cut -f4 -d"/"`
currentRepo=`git remote get-url origin | cut -f5 -d"/" | cut -f1 -d'.'`
# currentBranch=`git rev-parse --abbrev-ref HEAD`
currentBranch=master

echo "Creating infrastructure for ${currentOrg}/${currentRepo}/${currentBranch}" 

az group create \
  --name $resourceGroup \
  --location $region \
  --tags org=$currentOrg repo=$currentRepo branch=$currentBranch

if [ `az resource list --resource-group c2s-common-dev --name c2s-plan-dev --query '[].id' | wc -l ` == "0" ]
then
  az group deployment create \
    --name "scripted-deployment-${timeStamp}" \
    --resource-group c2s-common-dev \
    --template-file ./dev-common-template.json
fi

az group deployment create \
  --name "scripted-deployment-${timeStamp}" \
  --resource-group $resourceGroup \
  --template-file ./template.json \
  --parameters "{ \"org\": { \"value\": \"$currentOrg\" }, \"repo\": { \"value\": \"$currentRepo\" } , \"branch\": { \"value\": \"$currentBranch\" }, \"plan-resource-group\": { \"value\": \"c2s-common-dev\" }, \"plan-name\" : { \"value\": \"c2s-plan-dev\" }  }"

storageAccountName=`az storage account list --resource-group ${resourceGroup} --output list --query '[].name'`
storageAccountConnectionString=`az storage account show-connection-string --resource-group ${resourceGroup} --name ${storageAccountName} --query 'connectionString'`

az storage container create --name ods-input --connection-string=${storageAccountConnectionString}
az storage container create --name ods-split --connection-string=${storageAccountConnectionString}
