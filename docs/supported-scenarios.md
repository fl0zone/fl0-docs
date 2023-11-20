---
sidebar_position: 5
---

# Supported Scenarios

This page contains a list of scenarios and their support status on FL0.

## Applications

| Scenario           | Supported                                         | Notes                                                                                                                                                                             |
| ------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RESTful APIs       | <span class="badge badge--success">Yes</span>     |
| GraphQL            | <span class="badge badge--success">Yes</span>     |
| WebSockets         | <span class="badge badge--success">Yes</span>     |
| Background workers | <span class="badge badge--success">Yes</span>     |
| Static sites       | <span class="badge badge--success">Yes</span>     | Static sites can be deployed but require [some configuration](/docs/builds/buildpacks/static-sites)                                                                               |
| Frontend           | <span class="badge badge--warning">Partial</span> | You can deploy frontends on FL0, but you can't yet connect a custom domain or make use of a built-in CDN.                                                                         |
| Virtual Machines   | <span class="badge badge--danger">No</span>       | FL0 builds containers and doesn't support running virtual machines                                                                                                                |
| Monorepos          | <span class="badge badge--success">Yes</span>     | See [Configuring Build Settings](/docs/platform/builds-deployments#configuring-build-settings).                                                                                   |

# Supporting Services

| Scenario | Supported                                         | Notes                                                  |
| -------- | ------------------------------------------------- | ------------------------------------------------------ |
| Postgres | <span class="badge badge--success">Yes</span>     | Build-in support for Postgres                          |
| MySQL    | <span class="badge badge--warning">Partial</span> | No built-in support, bring-your-own database supported |
| MongoDB    | <span class="badge badge--warning">Partial</span> | No built-in support, bring-your-own database supported |
