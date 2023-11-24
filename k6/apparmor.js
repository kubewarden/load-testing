import { make_validate_request } from "./helper.js";
import { check, group } from "k6";

const accept_payload = JSON.parse(open("./requests/policy-apparmor-accept-request.json"));

export function verify_apparmor(baseUrl) {
  group("apparmor psp", function () {
    const validation_response = make_validate_request(baseUrl, "apparmor", accept_payload);

    check(validation_response, {
      "admission request accepted": (validation_response) => validation_response.response.allowed,
    });
  });
}
