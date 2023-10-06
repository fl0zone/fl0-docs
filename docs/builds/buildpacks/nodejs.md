---
---

import BuildArgumentsPartial from './partials/\_build-args-read-more.md'

# Node.js

The Node.js buildpack will automatically be applied as long as your project has one or more of the following:

- A `.nvmrc` file
- A `.node-version` file
- A `package.json` file
- The `BP_NODE_VERSION` [build argument](/docs/platform/builds-deployments) set

## Features

### Specifying a Node Version

FL0's build system checks the following for a specified Node version:

1. `package.json`
2. `.nvmrc`
3. `.node-version`
4. [`BP_NODE_VERSION`](#bp_node_version) build argument

### Building From a Subdirectory

By default, FL0 assumes your application is in the root directory. To override this, set the [`BP_NODE_PROJECT_PATH`](#bp_node_project_path) build argument accordingly.

### Running Scripts During Build Phase

FL0 will look for a `package.json` file and run the following scripts, if they exist:

1. `npm run build`
2. `npm start`

You can specify other scripts to run by setting the [`BP_NODE_RUN_SCRIPTS`](#bp_node_run_scripts) build argument.

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

Frameworks like React and Angular come with development servers that can be used to serve the built HTML content. This means you can use `npm start` to run these frontend frameworks. However, in some cases it is recommended to build source code into static HTML/CSS/JS and serve them directly. In this case, check our documentation on [serving static sites](/docs/builds/buildpacks/static-sites).

## Build Arguments

<BuildArgumentsPartial />

### `BP_NODE_VERSION`

The version of Node to install. [Supported versions](https://github.com/paketo-buildpacks/node-engine/releases/tag/v1.5.0).

Example: `BP_NODE_VERSION=18.16.0`

### `BP_NODE_OPTIMIZE_MEMORY`

Node.js limits the total size of all objects on the heap. Enabling the optimize-memory feature sets this value to three-quarters of the total memory available in the container. For example, if your app is limited to 1 GB at run time, the heap of your Node.js app is limited to 768 MB.

Example: `BP_NODE_OPTIMIZE_MEMORY=true`

### `BP_NODE_PROJECT_PATH`

By default, FL0 will build from the root directory. To choose a different folder, set this build argument. This is particularly useful if your application is part of a monorepo.

Example: `BP_NODE_PROJECT_PATH=packages/my-app`

### `BP_NODE_RUN_SCRIPTS`

FL0 will check your `package.json` file for a `build` script and run that if present. Use this build argument to override the default behavior with a comma-separated list of scripts to run.

Example: `BP_NODE_RUN_SCRIPTS=lint,build`

### `BP_LAUNCHPOINT`

If your application does not contain a `package.json`, FL0 will look for one of the following files and use it as the 'launchpoint':

- `server.js`
- `app.js`
- `main.js`
- `index.js`

To specify a different launchpoint, set this build argument to the name of the file.

Example: `BP_LAUNCHPOINT=./src/launchpoint.js`

### `BP_LOG_LEVEL`

Enable additional build logs by setting this build argument. This does not impact runtime logging of Node.js applications.

Example: `BP_LOG_LEVEL=DEBUG`

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
COPY tsconfig.json tsconfig.build.json ./
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
