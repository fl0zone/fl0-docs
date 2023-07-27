---
---

# Rust

Deploying your Rust app on FL0 is easy 🦀. Follow this guide to configure your codebase correctly.

Full code sample can be found here: https://github.com/fl0zone/template-rust

## Listening to the Right Port

FL0 injects an environment variable called `PORT` into your application's container. Your app must listen on this port. Below is an example of how to do this with `axum`.

```rust title=src/main.rs
// read the port from env vars.
let port = std::env::var("PORT")
  .unwrap_or("3000".to_string())
  .parse::<u16>()
  .expect("could not parse PORT env var");

// setup the axum routes.
let app = Router::new()
  .route(...

// bind the server to localhost and the port read from env vars above.
axum::Server::bind(&SocketAddr::from(([0, 0, 0, 0], port)))
  .serve(app.into_make_service())
  .await?;

```

## Built-in Language Support

:::info We don't natively support Rust builds in FL0 yet, so you will need to include a dockerfile in your repo.

## Dockerfile Support

FL0 will create a container based on this Dockerfile and deploy it to your environment.

Below is an example multi-stage Dockerfile designed to work well locally and on FL0.

```dockerfile title=Dockerfile
# Leveraging the pre-built Docker images with 
# cargo-chef and the Rust toolchain
FROM lukemathwalker/cargo-chef:latest-rust-1.65.0 AS chef
WORKDIR /app

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
# Build dependencies - this is the caching Docker layer!
RUN cargo chef cook --recipe-path recipe.json

COPY . .
RUN cargo build 

FROM rust:1.65-slim AS template-rust
COPY --from=builder /app/target/debug/template-rust /usr/local/bin
ENTRYPOINT ["/usr/local/bin/template-rust"]
```
