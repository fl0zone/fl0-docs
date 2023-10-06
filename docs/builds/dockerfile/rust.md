---
---

# Rust

Below is an example multi-stage Dockerfile designed to work well locally and on FL0.

```dockerfile title=/Dockerfile
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

Full code sample can be found here: https://github.com/fl0zone/template-rust
