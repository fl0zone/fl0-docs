---
---

# Node.js

Deploying your Node.js app on FL0 is easy. Follow this guide to configure your codebase correctly.

## Listening to the Right Port

FL0 injects an environment variable called PORT into your application's container. Your app must listen on this port. You can override this by providing a different value for `PORT` in the [Environment Variables](../platform/environment-variables) section of your application.

Below are some examples of how to do this with popular frameworks.

### Express

```js title="/app.js"
const express = require("express");
const app = express();

// This line is important to ensure your app listens to the PORT env var
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
```

### NestJS

```ts title="/src/main.ts"
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This line is important to ensure your app listens to the PORT env var
  await app.listen(process.env.PORT, "0.0.0.0");
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
```

## Built-in Language Support

You can build and deploy a Node.js application without a Dockerfile using FL0's automatic builds. To do this, ensure you have a `package.json` file in the root of your repo.

### Specifying a Node Version

FL0's build system checks the following files for a specified Node version, in this order:

1. `package.json`
2. `.nvmrc`
3. `.node-version`

### Building From a Subdirectory

:::info
Support for subdirectories coming soon. Currently, your app must reside in the root directory of your repository.
:::

### Running Scripts During Build Phase

FL0 will look for a `package.json` file and run the following scripts, if they exist:

1. `npm run build`
2. `npm start`

If no scripts are specified, FL0 will run the file specified in the `main` key in `package.json`.

For example, the following `package.json` configuration will result in FL0 running `node ./src/index.js`:

```json
{
  "name": "fl0-docs",
  "version": "1.0.0",
  "main": "./src/index.js",
  ...
}
```

:::info
Support for additional scripts is coming soon.
:::
To run others build scripts, such as a `test` or `lint` script, please append these to your `build` or `start` script. For example:

```json
{
  "name": "fl0-docs",
  "version": "1.0.0",
  "scripts": {
    "lint": "eslint .",
    "start": "npm run lint && node ./src/index.js"
  }
  ...
}
```

### Using NPM or Yarn

FL0's build system automatically detects if your codebase requires a package manager. By default, NPM will be used unless a `yarn.lock` file is found. You can use the following files in the root of your repository to control NPM and Yarn configuration:

1. [`.npmrc`](https://docs.npmjs.com/cli/v8/using-npm/config#npmrc-files)
1. [`.yarnrc`](https://classic.yarnpkg.com/en/docs/yarnrc)

### Without NPM or Yarn

You can build a Node.js application that doesn't use NPM or `node_modules`. FL0 will look for one of these files in the root of your repository and run it automatically:

1. server.js
2. app.js
3. main.js
4. index.js

### Build and Serve a Frontend App

Frameworks like React and Angular come with development servers that can be used to serve the built HTML content. This means you can use `npm start` to run these frontend frameworks. However, in some cases it is recommended to build source code into static HTML/CSS/JS and serve them directly. In this case, check our documentation on [serving static sites](/docs/quickstarts/static-sites).

## Dockerfile Support

Instead of relying on FL0's [built-in language support](#built-in-language-support) you can provide your own Dockerfile in the root of your repository. FL0 will create a container based on this Dockerfile and deploy it to your environment.

Below are some example multi-stage Dockerfiles designed to work well locally and on FL0. They are split into the following stages:

1. **development** stage works on a local machine and watches for file changes, reloading as necessary
2. **builder** stage is used to build a production version of your app
3. **production** stage is what finally gets deployed to FL0. It is designed to only contain production dependencies and be as small as possible. Assets from the builder stage are copied into the production stage

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
RUN rm -rf node_modules
RUN npm ci --only=production
RUN npm run build

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
COPY tsconfig.json tsconfig.build.json ./
COPY ./src ./src
CMD [ "npm", "run", "start:dev" ]

# Builder stage
FROM development as builder
WORKDIR /usr/src/app
RUN rm -rf node_modules
RUN npm ci --only=production
RUN npm i -g @nestjs/cli @types/node
RUN npm run build

# Production stage
FROM alpine:latest as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY --from=builder /usr/src/app ./
CMD [ "node", "dist/main" ]
```
