---
---

import DocCardList from '@theme/DocCardList';

# Builds

FL0's build system supports many languages automatically. You can also provide a Dockerfile to build for other languages or more complex scenarios.
When using automatic language detection, FL0 uses **buildpacks** to build your repository into a working application.

Buildpacks are libraries that are applied to your codebase to convert it into a container that can be deployed into a cluster.

## Default Behavior

When deploying an application, FL0 will look for a `Dockerfile` in the root of your repository and build your application with one of the following methods:

- **Dockerfile not found:** auto-detect language and apply a [buildpack](/docs/builds/buildpacks)
- **Dockerfile found:** build a container based on the Dockerfile

You can also manually select which option to use in the **Settings > Build** area of your application.

Read more about each type of build below:

<DocCardList />
