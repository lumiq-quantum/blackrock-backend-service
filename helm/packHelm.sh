rm ../charts/*
helm package . -d ../charts/
helm repo index ../charts/
