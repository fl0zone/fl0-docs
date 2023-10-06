---
slug: static-sites
---

import BuildArgumentsPartial from './partials/\_build-args-read-more.md'

# Static Sites

The Static Sites buildpack allows you to serve HTML/CSS/JS from a folder using either HTTPD or Nginx.
This buildpack can be used in combination with other buildpacks. For example, you might have a Node.js application that builds a static site into the `dist` folder. The Static Site buildpack can be used to serve the built content.

## Features

### Using Nginx

To use an Nginx web server, either add an `nginx.conf` to the root of your repo or set the `BP_WEB_SERVER` build argument to `nginx`.

### Using HTTPD

To use an HTTPD web server, either add an `httpd.conf` to the root of your repo or set the `BP_WEB_SERVER` build argument to `httpd`.

## Build Arguments

<BuildArgumentsPartial/>

### `BP_WEB_SERVER`

Accepts a value of either `httpd` or `nginx.`

Example: `BP_WEB_SERVER=nginx`.

### `BP_WEB_SERVER_ROOT`

Specify a folder other than the root directory.

Example: `BP_WEB_SERVER_ROOT=dist`

### `BP_HTTPD_VERSION`

Use a specific version of HTTPD

Example: `BP_HTTPD_VERSION=2.4.46`

### `BP_NGINX_VERSION`

Use a specific version of NGINX
Example: `BP_NGINX_VERSION=1.19.8`
