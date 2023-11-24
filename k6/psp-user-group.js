import { make_validate_request } from "./helper.js";
import { check, group } from "k6";

const accept_payload = JSON.parse(open("./requests/policy-user-group-accept-request.json"));
const reject_payload = JSON.parse(open("./requests/policy-user-group-reject-request.json"));

export function verify_psp_user_group(baseUrl) {
  group("PSP user group - accept", function () {
    const validation_response = make_validate_request(baseUrl, "psp-user-group", accept_payload);

    check(validation_response, {
      "admission request accepted": (validation_response) => validation_response.response.allowed,
    });
  });

  group("PSP user group - reject", function () {
    const validation_response = make_validate_request(baseUrl, "psp-user-group", reject_payload);

    check(validation_response, {
      "admission request accepted": (validation_response) => !validation_response.response.allowed,
    });
  });
}
