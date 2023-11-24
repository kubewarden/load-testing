export const thresholdsSettings = {
  http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
  http_req_duration: ["p(99)<1000"],
};

export const rampingVirtualUsersWorkload = {
  executor: "ramping-vus",
  stages: [
    // ramp up to average load of 20 virtual users
    { duration: "10s", target: 20 },
    // maintain load
    { duration: "50s", target: 20 },
    // ramp down to zero
    { duration: "5s", target: 0 },
  ],
};

export const breakingWorkload = {
  executor: "ramping-vus",
  stages: [
    { duration: "10s", target: 20 },
    { duration: "50s", target: 20 },
    { duration: "50s", target: 40 },
    { duration: "50s", target: 60 },
    { duration: "50s", target: 80 },
    { duration: "50s", target: 100 },
    { duration: "50s", target: 120 },
    { duration: "50s", target: 140 },
    //....
  ],
};
