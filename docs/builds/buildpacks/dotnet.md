---
slug: dotnet-core
title: .NET Core
---

import BuildArgumentsPartial from './partials/\_build-args-read-more.md'

# .Net Core

The .NET buildpack will automatically be applied as long as your project has one or more of the following:

- A `*.csproj` file
- A `*.fsproj` file
- A `*.vbproj` file
- The `BP_DOTNET_FRAMEWORK_VERSION` [build argument](/docs/platform/builds-deployments) set

## Features

### Installing Specific .NET Runtime and ASP.NET Versions

You can set version details in any of the following ways:

**Using the `BP_DOTNET_FRAMEWORK_VERSION` Build Argument**  
See the [BP_DOTNET_FRAMEWORK_VERSION](#bp_dotnet_framework_version) section on this page.

**Using a Project File**  
You can specify the .NET Core Runtime version in any of the following files:

- `*.csproj`
- `*.fsproj`
- `*.vbproj`

Include the following in your project file:

```xml
<Project>
  <PropertyGroup>
    <RuntimeFrameworkVersion>2.1.14</RuntimeFrameworkVersion>
  </PropertyGroup>
</Project>
```

**Using `runtimeconfig.json`**  
Set the framework version as follows:

```json
{
  "runtimeOptions": {
    "framework": {
      "version": "2.1.14"
    }
  }
}
```

### Building From a Subdirectory

By default, FL0 will look in the root folder for the .NET project. This directory needs to contain a C#, F# or VB Project file. If your project is located in a subdirectory, you can use the [`BP_DOTNET_PROJECT_PATH`](#bp_dotnet_project_path) build argument to override the default path.

### Configuring the `dotnet pyblish` Command

FL0 uses the `dotnet publish` command with the following default flags:

- `--configuration Release`
- `--runtime linux-x64`
- `--self-contained false`
- `--output <temp-directory>`

You can override this behavior using the [`BP_DOTNET_PUBLISH_FLAGS`](#bp_dotnet_publish_flags) build argument.

## Build Arguments

<BuildArgumentsPartial />

### `BP_DOTNET_FRAMEWORK_VERSION`

Configure the buildpack to use a certain version of the .NET Core Runtime and ASP.NET.

Example: `BP_DOTNET_FRAMEWORK_VERSION=5.0.4`

### `BP_DOTNET_PROJECT_PATH`

Configure the buildpack to build from a directory other than the root folder.

Example: `BP_DOTNET_PROJECT_PATH=./Path/To/Project`

### `BP_DOTNET_PUBLISH_FLAGS`

Override the default flags to be passed to the `dotnet publish` command

Example: `BP_DOTNET_PUBLISH_FLAGS=--verbosity=normal --self-contained=true`

## Example Template

An example of the ASP.NET Core application can be found in the FL0 templates repository: [fl0zone/template-dotnet](https://github.com/fl0zone/template-dotnet).
