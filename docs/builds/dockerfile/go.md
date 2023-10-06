---
title: Go
---

# Go

Below is a multi-stage Dockerfile designed to work well locally and on FL0.
They are split into the following stages:

1. **build** stage is used to build a production version of your app
2. **production** stage is what finally gets deployed to FL0.
   It is designed to only contain production dependencies and be as small as possible.
   Assets from the build stage are copied into the production stage

:::info
Keep in mind you'll need to alter this to work with your specific file structure.
:::

Make sure you change the first line to use your application's name if it is not called "app.go".

```bash title="/Dockerfile"
ARG APP_NAME=app

# Build stage
FROM golang:1.19 as build
ARG APP_NAME
ENV APP_NAME=$APP_NAME
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o /$APP_NAME

# Production stage
FROM alpine:latest as production
ARG APP_NAME
ENV APP_NAME=$APP_NAME
WORKDIR /root/
COPY --from=build /$APP_NAME ./
CMD ./$APP_NAME

```
