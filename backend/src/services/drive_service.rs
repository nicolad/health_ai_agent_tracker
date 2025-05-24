use reqwest::Client;

pub async fn upload_bytes_to_drive(bytes: &[u8], file_name: &str, token: &str) -> Result<(), String> {
    let client = Client::new();
    let url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=media";

    let resp = client
        .post(url)
        .bearer_auth(token)
        .header("Content-Type", "application/octet-stream")
        .header("Content-Disposition", format!("attachment; filename=\"{}\"", file_name))
        .body(bytes.to_vec())
        .send()
        .await
        .map_err(|e| format!("Request error: {e}"))?;

    if resp.status().is_success() {
        Ok(())
    } else {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();
        Err(format!("Upload failed: {status} - {text}"))
    }
}
