---
sidebar_position: 6
---

# Troubleshooting

Unfortunately, sometimes problems happen! This page outlines some of the most common errors and provides advice on solving them.

## Deployment Errors

If your deployment fails, you will see an error with one of the stages below.

### Setup stage

1. There was a problem connecting to your Git repo. Check the FL0 app is correctly installed in your Github organization

### Build stage

1. There was a problem building from your Dockerfile. Ensure your Dockerfile runs locally and check the logs in FL0
2. FL0 could not auto-detect your codebase. Check our language-specific [quickstart guides](/docs/builds/buildpacks) for more details
3. There was a problem auto-building your codebase. Check the build logs for more details

### Deploy stage

Errors during the Deploy stage usually mean your app crashed when it was started. This can be for a number of reasons:

1. Syntax errors in your code
2. Missing environment variables - make sure they've been set correctly in FL0
3. Problems accessing the database
4. Your app is not exposing a service on the port defined by the `PORT` environment variable

Check the Application Logs for more information about the error thrown on startup.
