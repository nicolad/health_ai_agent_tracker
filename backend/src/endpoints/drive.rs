use actix_web::{
    dev::ServiceRequest,
    post,
    web::{self, Json},
    HttpRequest, HttpResponse, Responder,
};
use clerk_rs::validators::actix::clerk_authorize;
use serde::Deserialize;
use serde_json::json;

use crate::app_state::AppState;
use crate::utils::drive::{get_google_oauth_token, upload_bytes_multipart};

#[derive(Deserialize)]
pub struct DrivePayload {
    pub file_path: String,
}

#[post("/drive")]
pub async fn upload_drive(
    state: web::Data<AppState>,
    req: HttpRequest,
    payload: Json<DrivePayload>,
) -> impl Responder {
    let srv_req = ServiceRequest::from_request(req);
    if let Err(e) = clerk_authorize(&srv_req, &state.client, true).await {
        return e;
    }

    let token = match get_google_oauth_token().await {
        Ok(t) => t,
        Err(e) => {
            return HttpResponse::InternalServerError()
                .json(json!({"error": e.to_string()}));
        }
    };

    let bytes = match tokio::fs::read(&payload.file_path).await {
        Ok(b) => b,
        Err(e) => {
            return HttpResponse::InternalServerError().json(json!({
                "error": format!("Unable to read {}: {e}", payload.file_path)
            }));
        }
    };

    let file_name = std::path::Path::new(&payload.file_path)
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("file.mp3");

    if let Err(e) = upload_bytes_multipart(&bytes, "audio/mpeg", file_name, &token).await {
        return HttpResponse::InternalServerError().json(json!({"error": e.to_string()}));
    }

    HttpResponse::Ok().json(json!({"status": "uploaded"}))
}
