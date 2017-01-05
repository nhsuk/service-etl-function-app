functionName=services-etl
timeStamp=`date "+%Y%m%d%H%M%S"`
baseName=`whoami`-dev-${functionName}-${timeStamp}
resourceGroup=${baseName}
region=uksouth
currentRepoPath=`git rev-parse --show-toplevel`
currentRepo=`basename $currentRepoPath`
currentBranch=`git rev-parse --abbrev-ref HEAD`
parameters="{ \"github_repo\": { \"value\": \"$currentRepo\" } , \"branch\": { \"value\": \"$currentBranch\" } }"

azure group create $resourceGroup $region
azure group deployment create \
  --resource-group $resourceGroup \
  --template-file ./template.json \
  --parameters "{ \"github_repo\": { \"value\": \"$currentRepo\" }, \"branch\": { \"value\": \"$currentBranch\" } }"
