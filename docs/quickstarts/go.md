---
---

# Go

Deploying your Go app on FL0 is easy. Follow this guide to configure your codebase correctly.

## Listening to the Right Port

FL0 injects an environment variable called PORT into your application's container.
Your app must listen on this port. Below is a simple golang application that
listens on this port.

```go
package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
)

func greet(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!  %s", time.Now())
}

func main() {
	http.HandleFunc("/", greet)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	http.ListenAndServe(":"+port, nil)
}
```

## Built-in Language Support

You can build and deploy a Go application without a Dockerfile using FL0's built-in automatic builds.

## Dockerfile Support

Instead of relying on FL0's [built-in language support](#built-in-language-support)
you can provide your own Dockerfile in the root of your repository.
FL0 will create a container based on this Dockerfile and deploy it to your environment.

Below is a multi-stage Dockerfile designed to work well locally and on FL0.
They are split into the following stages:

1. **build** stage is used to build a production version of your app
2. **production** stage is what finally gets deployed to FL0.
   It is designed to only contain production dependencies and be as small as possible.
   Assets from the build stage are copied into the production stage


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
