#!/usr/bin/env python3

from locust import task
from locust.contrib.fasthttp import FastHttpUser

import os

class AdmissionRequest:
    def __init__(self, endpoint, request_file, expected_response_http_status):
        with open("/var/run/secrets/kubernetes.io/serviceaccount/token", "r") as f:
            self._auth_token = f.read()

        self._endpoint = endpoint

        self._expected_response_http_status = expected_response_http_status

        req_file_dir = os.environ.get("LOCUST_TEMPLATES_DIR", "lib")
        with open(os.path.join(req_file_dir, request_file), "r") as f:
            self._request = f.read()

    @property
    def endpoint(self):
        return self._endpoint

    @property
    def expected_response_http_status(self):
        return self._expected_response_http_status

    @property
    def data(self):
        return self._request

    def eval(self, user):
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer {}".format(self._auth_token),
        }

        with user.client.post(
                self.endpoint,
                data=self.data,
                headers=headers,
                catch_response=True) as response:
            if response.status_code == self._expected_response_http_status:
                response.success()
            else:
                response.failure("Wron response code: got {} instead of {}".format(
                    response.status_code,
                    self._expected_response_http_status))

class MyUser(FastHttpUser):
    tasks = [
        AdmissionRequest(
            endpoint="/apis/apps/v1/namespaces/default/deployments",
            request_file="nginx-echo.json",
            expected_response_http_status = 418,
        ).eval,
    ]

    insecure = True
