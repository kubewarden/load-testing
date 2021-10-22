#!/usr/bin/env python3

from locust import task
from locust.contrib.fasthttp import FastHttpUser

from string import Template
import uuid
import os

class AdmissionRequest:
    def __init__(self, endpoint, template_file):
        self._endpoint = os.path.join("/validate", endpoint)
        with open(template_file, "r") as f:
            self._template = Template(f.read())

    @property
    def endpoint(self):
        return self._endpoint

    def data(self):
        req_uid = uuid.uuid4()
        obj_uid = uuid.uuid4()
        return self._template.substitute(req_uid=req_uid, obj_uid=obj_uid)

    def eval(self, user):
        user.client.post(self.endpoint, data=self.data())


class MyUser(FastHttpUser):
    tasks = [
        AdmissionRequest(endpoint="psp-capabilities", template_file="requests/req_pod_without_security_context.json.tmpl").eval,
        AdmissionRequest(endpoint="psp-capabilities", template_file="requests/req_pod_with_container_with_capabilities_added.json.tmpl").eval,
        AdmissionRequest(endpoint="psp-user-group", template_file="requests/policy-user-group-reject-request.json").eval,
        AdmissionRequest(endpoint="psp-user-group", template_file="requests/policy-user-group-mutate-request.json").eval,
        AdmissionRequest(endpoint="psp-apparmor", template_file="requests/policy-apparmor-accept-request.json").eval
    ]
