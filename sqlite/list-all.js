import { make_validate_request } from "./helper.js";
import { check, group } from "k6";

const accept_payload = JSON.parse(open("./ar-load-testing-accept.json"));

export function list_all(baseUrl) {
  group("get-all", function () {
    const validation_response = make_validate_request(baseUrl, "list-all", accept_payload);

    check(validation_response, {
      "admission request accepted": (validation_response) => validation_response.response.allowed,
    });
  });
}
