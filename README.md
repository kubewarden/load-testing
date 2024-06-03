[![Kubewarden Infra Repository](https://github.com/kubewarden/community/blob/main/badges/kubewarden-infra.svg)](https://github.com/kubewarden/community/blob/main/REPOSITORIES.md#infra-scope)
[![Stable](https://img.shields.io/badge/status-stable-brightgreen?style=for-the-badge)](https://github.com/kubewarden/community/blob/main/REPOSITORIES.md#stable)

This is repository contains load tests for Kubewarden's policy server.
Load tests are done using [locust](https://locust.io/).

# Repository organization

The repository defined two types of tests, defined inside of these
directories:

* `direct-connection`: locust is going to hit Kubewarden's Policy Server directly.
  This test is useful to understand how well Policy Server is behaving.
* `indirect-connection`: locust is going to simulate a user making operations
  against the Kubernetes API server. These requests will cause the Kubernetes API
  server to reach out to the Policy Server. The requests per seconds (RPS) reported
  will be significantly lower in this case. This test has been created because
  initial versions of Policy Server were affected by a rare bug that caused the
  Policy Server to halt. This bug was reproducible only when the connections
  were originated by Kubernetes' API server. See
  [this issue](https://github.com/kubewarden/policy-server/issues/239)
  for more details.

Which test should you run? That depends on your scope. If you want to be sure
your changes didn't introduce any performance regression, then use `direct-connection`.

# Pre-requisites

Deploy the Kubewarden stack ensuring:

* The stack is deployed inside of the `kubewarden` Namespace
* A `default` Policy Server exists

This can be achieved by following the quickstart documentation of Kubewarden.

Once the whole stack is up and running, deploy the following policies:

```console
kubectl apply -f policies.yaml
```

Ensure the `default` Policy Server instance is up and running:

```console
kubectl get pods -n kubewarden
```

# Installation

Tests are going to run inside of a Kubernetes cluster, the same cluster where
the Kubewarden stack is deployed.

We're going to install locust using [this helm chart](https://github.com/deliveryhero/helm-charts/tree/master/stable/locust).

Follow these steps:

```console
helm repo add deliveryhero https://charts.deliveryhero.io/
```

The containerized locust will then load the testing code from two ConfigMaps:
one holding the `main.py` and the other containing python support files or
fixtures.

First of all, let's create a Namespace for all the locust resources:

```console
kubectl create ns locust
```

Then, let's create the ConfigMaps used by the direct tests:

```console
kubectl create configmap -n locust kubewarden-locustfile-direct --from-file direct-connection/main.py
kubectl create configmap -n locust kubewarden-locust-direct-lib --from-file direct-connection/lib
```

Finally, let's create the ConfigMaps used by the indirect tests:

```console
kubectl create configmap -n locust kubewarden-locustfile-indirect --from-file indirect-connection/main.py
kubectl create configmap -n locust kubewarden-locust-indirect-lib --from-file indirect-connection/lib
```

Now we have to decide which kind of testing suite we want to run.

To perform the `direct-connection` test, execute the following command:

```console
helm install -n locust locust deliveryhero/locust -f direct-connection/values.yaml
```

To perform the `indirect-connection` test, execute the following command:

```console
helm install -n locust locust deliveryhero/locust -f indirect-connection/values.yaml
```

### Extra steps for indirect tests

To perform the inderect tests, a special RBAC rule must be defined.
This has to be done once, by executing the following command:

```console
kubectl apply -f rbac.yaml
```

This RBAC rule grants [`admin`](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles)
access to the resources defined inside of the `default` Namespace to the
Service Accounts associated with locust. This is required to fake user requests
inside of the `default` Namespace (where the `AdmissionPolicy` policies are
enforced) to the Kubewarden stack (which lives inside of a different Namespace).

## Toggle between tests

To switch from the two tests, peform the a command similar to
to the next one, just pick the right `values.yaml`:

```console
helm upgrade -n locust locust deliveryhero/locust --values indirect-connection/values.yaml
```

This command, for example, ensures the `indirect-connection` tests are going to be run.


### Access locust web UI and run the tests

To access locust's UI, execute the following command:

```console
kubectl port-forward -n locust service/locust 8089:8089
```

Leave the command running and open [localhost:8089](http://localhost:8089)
with your browser.

Customize the load test settings and press "start swarming".

> **Note:** ensure the right `Host` has been populated, especially if you
> switched between the two different test suites.

