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
use crate::services::drive_service::upload_bytes_to_drive;

#[derive(Deserialize)]
pub struct AnalysisPayload {
    pub content: String,
    pub file_name: String,
}

#[post("/analysis/upload")]
pub async fn upload_analysis(
    state: web::Data<AppState>,
    req: HttpRequest,
    payload: Json<AnalysisPayload>,
) -> impl Responder {
    let srv_req = ServiceRequest::from_request(req);
    if let Err(e) = clerk_authorize(&srv_req, &state.client, true).await {
        return e;
    }

    let token = match std::env::var("GOOGLE_DRIVE_TOKEN") {
        Ok(t) => t,
        Err(_) => {
            let err = json!({ "error": "GOOGLE_DRIVE_TOKEN not set" });
            return HttpResponse::InternalServerError().json(err);
        }
    };

    match upload_bytes_to_drive(payload.content.as_bytes(), &payload.file_name, &token).await {
        Ok(_) => HttpResponse::Ok().json(json!({ "status": "uploaded" })),
        Err(e) => HttpResponse::InternalServerError().json(json!({ "error": e })),
    }
}
