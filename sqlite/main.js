// import necessary module
import { list_all } from "./list-all.js";
import { thresholdsSettings, rampingVirtualUsersWorkload } from "./config.js";

export const options = {
  thresholds: thresholdsSettings,
  // define scenarios
  scenarios: {
    policy_server: rampingVirtualUsersWorkload,
  },
  insecureSkipTLSVerify: true, // Ignore certificate verification
};

export default function () {
  const baseUrl = "http://localhost:3000";

  // test_get_ns(baseUrl);
  list_all(baseUrl);
}
