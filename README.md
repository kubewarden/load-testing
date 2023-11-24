> **Warning:** this is still a WIP

This is repository contains load tests for Kubewarden's policy server.
Load tests are done using [k6](https://k6.io/).

# Repository organization

- `k6`: this directory contains the k6 tests
- `compose`: this directory contains the docker compose file.
  This creates a stack made of influxdb and grafana.
  The stack can be used to receive and show k6 results.

# Pre-requisites

- Policy Server binary
- k6 binary
- docker-compose (optional): if you want to store the results into influxdb and use grafana
  to show the different metrics

# Run the tests

Start an instance of Policy Server:

```console
./policy-server \
    --ignore-kubernetes-connection-failure 1 \
    --policies policies.yaml \
    --policies-download-dir $(pwd)/policy-store \
    --policy-timeout 2 \
    --workers 2
```

Once the Policy Server is up and running, you can start the tests in this way:

```console
cd k6
k6 run main.js
```
