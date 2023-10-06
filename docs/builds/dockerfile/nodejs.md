---
title: Node.js
---

# Node.js Dockerfiles

Below are some example multi-stage Dockerfiles designed to work well locally and on FL0. They are split into the following stages:

1. **development** stage works on a local machine and watches for file changes, reloading as necessary
2. **builder** stage is used to build a production version of your app
3. **production** stage is what finally gets deployed to FL0. It is designed to only contain production dependencies and be as small as possible. Assets from the builder stage are copied into the production stage

:::info
Keep in mind you'll need to alter these to work with your specific file structure.
:::

### Javascript

```bash title="/Dockerfile"
# Development stage
FROM node:16 as development
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN npm install
COPY ./src ./src
CMD [ "npm", "run", "start:dev" ]

# Builder stage
FROM development as builder
WORKDIR /usr/src/app
# Build the app with devDependencies still installed from "development" stage
RUN npm run build
# Clear dependencies and reinstall for production (no devDependencies)
RUN rm -rf node_modules
RUN npm ci --only=production

# Production stage
FROM alpine:latest as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY --from=builder /usr/src/app ./
CMD [ "node", "./build/index.js" ]
```

### Typescript

```bash title="/Dockerfile"
# Development stage
FROM node:16 as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY ./src ./src
CMD [ "npm", "run", "start:dev" ]

# Builder stage
FROM development as builder
WORKDIR /usr/src/app
# Build the app with devDependencies still installed from "development" stage
RUN npm run build
# Clear dependencies and reinstall for production (no devDependencies)
RUN rm -rf node_modules
RUN npm ci --only=production


# Production stage
FROM alpine:latest as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY --from=builder /usr/src/app ./
CMD [ "node", "dist/main" ]
```
