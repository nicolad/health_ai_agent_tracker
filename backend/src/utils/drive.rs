use anyhow::{anyhow, Result};
use reqwest::{multipart, Client};
use serde::Deserialize;
use serde_json::json;

#[derive(Deserialize)]
struct GoogleToken {
    access_token: String,
}

/// Fetch the Google OAuth access token. In this example we simply read
/// the `GOOGLE_DRIVE_TOKEN` environment variable. In a real application
/// this would call Clerk's OAuth access token API.
pub async fn get_google_oauth_token() -> Result<String> {
    std::env::var("GOOGLE_DRIVE_TOKEN").map_err(|_| anyhow!("GOOGLE_DRIVE_TOKEN not set"))
}

/// Upload bytes to Google Drive using the multipart upload API.
pub async fn upload_bytes_multipart(
    bytes: &[u8],
    mime_type: &str,
    file_name: &str,
    access_token: &str,
) -> Result<()> {
    let metadata = json!({ "name": file_name });
    let form = multipart::Form::new()
        .part(
            "metadata",
            multipart::Part::text(metadata.to_string())
                .mime_str("application/json")?,
        )
        .part(
            "file",
            multipart::Part::bytes(bytes.to_vec()).mime_str(mime_type)?,
        );

    let client = Client::new();
    let resp = client
        .post("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart")
        .bearer_auth(access_token)
        .multipart(form)
        .send()
        .await
        .map_err(|e| anyhow!("Request error: {e}"))?;

    if resp.status().is_success() {
        Ok(())
    } else {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();
        Err(anyhow!("Upload failed: {status} - {text}"))
    }
}
