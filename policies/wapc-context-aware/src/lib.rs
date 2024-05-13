use guest::prelude::*;
use k8s_openapi::{api::rbac::v1::RoleBinding, Resource};
use kubewarden_policy_sdk::host_capabilities::kubernetes::*;
use kubewarden_policy_sdk::wapc_guest as guest;

extern crate kubewarden_policy_sdk as kubewarden;
use kubewarden::{protocol_version_guest, request::ValidationRequest, validate_settings};

mod settings;
use settings::{Querytype, Settings};

#[no_mangle]
pub extern "C" fn wapc_init() {
    register_function("validate", validate);
    register_function("validate_settings", validate_settings::<Settings>);
    register_function("protocol_version", protocol_version_guest);
}

fn validate(payload: &[u8]) -> CallResult {
    let validation_request: ValidationRequest<Settings> = ValidationRequest::new(payload)?;
    let settings = validation_request.settings;

    let err = match &settings.query_type {
        Querytype::ListAll => {
            let request = ListAllResourcesRequest {
                api_version: RoleBinding::API_VERSION.to_owned(),
                kind: RoleBinding::KIND.to_owned(),
                label_selector: None,
                field_selector: None,
            };
            list_all_resources::<RoleBinding>(&request).err()
        }
        Querytype::GetOne { name, namespace } => {
            let request = GetResourceRequest {
                api_version: RoleBinding::API_VERSION.to_owned(),
                kind: RoleBinding::KIND.to_owned(),
                name: name.to_owned(),
                namespace: namespace.to_owned(),
                disable_cache: true,
            };
            get_resource::<RoleBinding>(&request).err()
        }
    };

    if let Some(err) = err {
        kubewarden::reject_request(
            Some(format!(
                "Error while listing resources {:?}: {}",
                settings.query_type, err
            )),
            None,
            None,
            None,
        )
    } else {
        kubewarden::accept_request()
    }
}
