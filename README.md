
## BlackRock Backend Service
## Installation steps
```bash
# create new namespace
$ kubectl create namespace lumiq-blackrock

# Add istio injection to namespace
$ kubectl label namespace lumiq-blackrock istio-injection=enabled

# pull helm repo 
$ helm repo add lumiq https://lumiq-quantum.github.io/blackrock-backend-service/charts/

# Search the for the
$ helm search repo lumiq

# Install the blackrock-backend-service from the repo
$ helm install blackrock-backend-service lumiq/blackrock-backend-service \
    --set pagerDutyApiEndpoint="<YOUR-PAGERDUTY-ENDPOINT>" \
    --set pagerDutyToken="<YOUR-PAGERDUTY-ENDPOINT>" \
    --set pagerDutyUserEmail="<YOUR-PAGERDUTY-ENDPOINT>" \
    --set serviceNowApiEndpoint="<YOUR-SERVICE-NOW-ENDPOINT>" \
    --set serviceNowUserName="<YOUR-SERVICE-NOW-USERNAME>" \
    --set serviceNowPassword="<YOUR-SERVICE-NOW-PASSWORD>" \
    --set gateway="<GATEWAY-NAME>" \
    --set host="'<YOUR-HOST>'" \
    --set image="<DOCKER-IMAGE-LOCATION>"
    --set proxyHost="<PROXY-HOST-ADDRESS>"
    --set proxyPort="<PROXY-PORT>"
    --set proxyProtocol="<PROXY-PROTOCOL http or https>"
    -n lumiq-blackrock
```

For the default values check the values.yaml file below.

values.yaml file -> <a href="/helm/values.yaml">values.yaml</a>

