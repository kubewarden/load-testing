import http from "k6/http";
import { check } from "k6";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

export function make_validate_request(baseUrl, policyId, payload) {
  const url = baseUrl + "/validate/" + policyId;

  const request_uid = uuidv4();
  payload.request.uid = request_uid;

  payload.request.object.uid = uuidv4();

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, JSON.stringify(payload), params);
  const validation_response = JSON.parse(res.body);

  check(res, {
    "response code was 200": (res) => res.status == 200,
  });
  check(validation_response, {
    "response uid matches request": (validation_response) =>
      validation_response.response.uid == request_uid,
  });

  return validation_response;
}
