import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 10 }, // Ramp-up to 10 virtual users over 30 seconds
    { duration: "1m", target: 10 }, // Stay at 10 virtual users for 1 minute
    { duration: "30s", target: 0 }, // Ramp-down to 0 virtual users over 30 seconds
  ],
};

export default function () {
  // Define the RoleBinding object payload
  let roleBinding = {
    apiVersion: "rbac.authorization.k8s.io/v1",
    kind: "RoleBinding",
    metadata: {
      name: "example-role-binding",
      namespace: "default", // Modify if the namespace is different
    },
    subjects: [
      {
        kind: "ServiceAccount",
        name: "default", // Modify with the user you want to bind the role to
        namespace: "foobar",
      },
    ],
    roleRef: {
      kind: "ClusterRole",
      name: "cluster-admin", // Modify with the role you want to bind
      apiGroup: "rbac.authorization.k8s.io",
    },
  };

  // Send a POST request to create the RoleBinding object
  let res = http.post(
    "http://localhost:8001/apis/rbac.authorization.k8s.io/v1/namespaces/default/rolebindings",
    JSON.stringify(roleBinding),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  // Check if the request was successful
  check(res, {
    "RoleBinding creation was blocked by policy": (r) => r.status === 400,
  });

  // Sleep for a short duration between iterations
  // sleep(1);
}
