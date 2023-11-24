// import necessary module
import { verify_apparmor } from "./apparmor.js";
import { verify_psp_user_group } from "./psp-user-group.js";
import { thresholdsSettings, rampingVirtualUsersWorkload } from "./config.js";

export const options = {
  thresholds: thresholdsSettings,
  // define scenarios
  scenarios: {
    policy_server: rampingVirtualUsersWorkload,
  },
};

export default function () {
  const baseUrl = "http://localhost:3000";

  verify_apparmor(baseUrl);
  verify_psp_user_group(baseUrl);
}
