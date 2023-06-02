use axum::{
    extract::{Path, State},
    response::{IntoResponse, Response},
    routing::{get, post},
    Form, Json, Router,
};
use reqwest::{Method, StatusCode};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};

const ENDPOINT: &str = "https://api.nature.global";

struct AppError(anyhow::Error);

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", self.0),
        )
            .into_response()
    }
}

impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}

struct AppState {
    client: reqwest::Client,
    token: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateAirconSettings {
    pub button: String,
    pub temperature: String,
    pub operation_mode: String,
    pub air_volume: String,
    pub air_direction: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateTV {
    pub button: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateLight {
    pub button: String,
}

async fn appliances(
    State(state): State<Arc<AppState>>,
) -> Result<Json<serde_json::Value>, AppError> {
    let state = Arc::clone(&state);
    let resp = state
        .client
        .get(ENDPOINT.to_string() + "/1/appliances")
        .bearer_auth(&state.token)
        .send()
        .await?;
    Ok(Json(resp.json().await?))
}

async fn devices(State(state): State<Arc<AppState>>) -> Result<Json<serde_json::Value>, AppError> {
    let state = Arc::clone(&state);
    let resp = state
        .client
        .get(ENDPOINT.to_string() + "/1/devices")
        .bearer_auth(&state.token)
        .send()
        .await?;
    Ok(Json(resp.json().await?))
}

async fn update_aricon_setteings(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
    Form(form): Form<UpdateAirconSettings>,
) -> Result<Json<serde_json::Value>, AppError> {
    let state = Arc::clone(&state);
    let resp = state
        .client
        .post(ENDPOINT.to_string() + &format!("/1/appliances/{id}/aircon_settings"))
        .bearer_auth(&state.token)
        .form(&form)
        .send()
        .await?;
    Ok(Json(resp.json().await?))
}

async fn send_light_button(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
    Form(form): Form<UpdateLight>,
) -> Result<Json<serde_json::Value>, AppError> {
    let state = Arc::clone(&state);
    let resp = state
        .client
        .post(ENDPOINT.to_string() + &format!("/1/appliances/{id}/light"))
        .bearer_auth(&state.token)
        .form(&form)
        .send()
        .await?;
    Ok(Json(resp.json().await?))
}

async fn send_tv_button(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
    Form(form): Form<UpdateTV>,
) -> Result<Json<serde_json::Value>, AppError> {
    let state = Arc::clone(&state);
    let resp = state
        .client
        .post(ENDPOINT.to_string() + &format!("/1/appliances/{id}/tv"))
        .bearer_auth(&state.token)
        .form(&form)
        .send()
        .await?;
    Ok(Json(resp.json().await?))
}

async fn send_signal(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<Json<serde_json::Value>, AppError> {
    let state = Arc::clone(&state);
    let resp = state
        .client
        .post(ENDPOINT.to_string() + &format!("/1/signals/{id}/send"))
        .bearer_auth(&state.token)
        .send()
        .await?;
    Ok(Json(resp.json().await?))
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST])
        .allow_headers(Any);
    let app = Router::new()
        .route("/appliances", get(appliances))
        .route("/devices", get(devices))
        .route(
            "/appliances/:id/aircon_settings",
            post(update_aricon_setteings),
        )
        .route("/appliances/:id/light", post(send_light_button))
        .route("/appliances/:id/tv", post(send_tv_button))
        .route("/signals/:id/send", post(send_signal))
        .with_state(Arc::new(AppState {
            client: reqwest::Client::new(),
            token: std::env::var("TOKEN").expect("not found TOKEN"),
        }))
        .layer(cors);

    axum::Server::bind(&"0.0.0.0:3000".parse()?)
        .serve(app.into_make_service())
        .await?;
    Ok(())
}
