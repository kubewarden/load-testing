use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Default)]
#[serde(tag = "type")]
#[serde(rename_all = "camelCase")]
pub(crate) enum Querytype {
    #[default]
    ListAll,
    GetOne {
        name: String,
        namespace: Option<String>,
    },
}

// Describe the settings your policy expects when
// loaded by the policy server.
#[derive(Serialize, Deserialize, Default, Debug)]
#[serde(default)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Settings {
    pub query_type: Querytype,
}

impl kubewarden::settings::Validatable for Settings {
    fn validate(&self) -> Result<(), String> {
        Ok(())
    }
}
