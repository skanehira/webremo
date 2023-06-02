use axum::{
    extract::{Path, State},
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use reqwest::{Method, StatusCode};
use std::{println, sync::Arc};
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

// TODO
async fn update_aricon_setteings(State(_state): State<Arc<AppState>>, Path(id): Path<String>) {
    println!("{}", id);
}

// TODO
async fn send_light_button(State(_state): State<Arc<AppState>>, Path(id): Path<String>) {
    println!("{}", id);
}

// TODO
async fn send_signal(State(_state): State<Arc<AppState>>, Path(id): Path<String>) {
    println!("{}", id);
}

// TODO
async fn send_tv_button(State(_state): State<Arc<AppState>>, Path(id): Path<String>) {
    println!("{}", id);
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
