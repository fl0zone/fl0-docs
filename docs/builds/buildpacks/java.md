---
---

import BuildArgumentsPartial from './partials/\_build-args-read-more.md'

# Java

The Java buildpack will automatically detect the type of project and artifacts. However, you can override the default settings through the many build arguments available.

## System Requirements

To ensure your Spring Boot application starts up quickly and runs well, we recommend at least `0.75 GB` and `0.75 vCPU` of Compute.

:::caution
Spring Boot applications may not have sufficient resources to run on the FL0 Free Tier. We recommend upgrading to the Pro plan to run Spring Boot.
:::

## Features

### Build from Source

The Java buildpack is comprised of several child buildpacks that assist with building for specific tools and frameworks. These include:

- Maven
- Gradle
- Lein
- Scala (SBT)

The correct build tool to use will be detected based on the contents of the application directory. Your build needs to produce a [supported artifact format](#supported-artifacts).

Once the source code is built into an artifact, the build will continue as per the [Building from a Compiled Artifact](#building-from-a-compiled-artifact) section.

#### Select a Module or Artifact

You can select a module or artifact using the [`BP_<TOOL>_BUILT_MODULE`](#bp_tool_built_module) and [`BP_<TOOL>_BUILT_ARTIFACT`](#bp_tool_built_artifact) build arguments.

##### Specify the Build Command

See the [`BP_<TOOL>_BUILD_ARGUMENTS`](#bp_tool_build_arguments) build argument for more details.

### Building from a Compiled Artifact

FL0 will automatically detect the type of artifact in your repository. If a WAR is detected, Apache Tomcat will be installed as well.

### Installing a Specific JVM Version

### Configure the JVM at Runtime

There are several additional build arguments that can be used to adjust the `JAVA_TOOL_OPTIONS` environment variable. See the [Bellsoft Liberica Buildpack](https://github.com/paketo-buildpacks/bellsoft-liberica) documentation for a full list.

## Supported Artifacts

FL0 supports the following archive formats:

- Executable JAR
- WAR
- Distribution ZIP

The buildpack will do the following:

- Requests that a JDK be installed
- Links the `~/.gradle` to a layer for caching
- If `<APPLICATION_ROOT>/gradlew` exists
  - Runs `<APPLICATION_ROOT>/gradlew --no-daemon assemble` to build the application
- If `<APPLICATION_ROOT>/gradlew` does not exist
  - Contributes Gradle to a layer with all commands on `$PATH`
  - Runs `<GRADLE_ROOT>/bin/gradle --no-daemon assemble` to build the application
- Removes the source code in `<APPLICATION_ROOT>`, following include/exclude rules

## Build Arguments

<BuildArgumentsPartial/>

For any Build Arguments containing `<TOOL>`, replace `<TOOL>` with one of `MAVEN`, `GRADLE`, `LEIN` or `SBT`.

### `BP_JVM_VERSION`

Use this build argument to specify a different JVM version. The default is the latest 17.x version at the time of release.

Example: `BP_JVM_VERSION=8` or `BP_JVM_VERSION=8.*`

### `BP_JVM_TYPE`

This build argument configures whether a JDK or JRE is installed at runtime. Defaults to `JRE`.

Example: `BP_JVM_TYPE=JDK`

### `BP_<TOOL>_BUILT_MODULE`

Defaults to the root module.

Example: `BP_MAVEN_BUILT_MODULE=api` - will look for the artifact with the file pattern `target/api/*.[jw]ar`

### `BP_<TOOL>_BUILT_ARTIFACT`

Defaults to a tool-specific pattern (e.g. `target/*.[jw]ar` for Maven, `build/libs/*.[jw]ar` for gradle).

Example: `BP_MAVEN_BUILT_ARTIFACT=out/api-*.jar` - FL0 will select a file with name `name out/api-1.0.0.jar`

### `BP_<TOOL>_BUILD_ARGUMENTS`

Maven builds can also use two additional build arguments, [`BP_MAVEN_ADDITIONAL_BUILD_ARGUMENTS`](#bp_maven_additional_build_arguments) and [`BP_MAVEN_ACTIVE_PROFILES`](#bp_maven_active_profiles)

Gradle builds can also use the [`BP_GRADLE_ADDITIONAL_BUILD_ARGUMENTS`](#bp_gradle_additional_build_arguments) build argument.

### `BP_MAVEN_ADDITIONAL_BUILD_ARGUMENTS`

Configures additional arguments to pass to the maven build tool; it defaults to empty string and can be handy when you want to keep the default `BP_MAVEN_BUILD_ARGUMENTS` but just need one additional argument.

Example: `BP_MAVEN_ADDITIONAL_BUILD_ARGUMENTS=-DskipTool`

### `BP_MAVEN_ACTIVE_PROFILES`

Configures active profiles to pass to the maven build tool; it defaults to empty string and can be handy when you want to keep the default `BP_MAVEN_BUILD_ARGUMENTS` but just need several profiles activated/deactivated.

Example: `BP_MAVEN_ACTIVE_PROFILES=p1,!p2,?p3` - activate the p1 profile, deactivate the p2 profile, and optionally activate the p3 profile, without changing `BP_MAVEN_BUILD_ARGUMENTS`

### `BP_GRADLE_ADDITIONAL_BUILD_ARGUMENTS`

Configures additional arguments to pass to the gradle build tool; it defaults to empty string and can be handy when you want to keep the default `BP_GRADLE_BUILD_ARGUMENTS` but just need one additional argument.

Example: `BP_GRADLE_ADDITIONAL_BUILD_ARGUMENTS=--no-build-cache` - disable build cache without changing `BP_GRADLE_BUILD_ARGUMENTS`

### `BP_JAVA_INSTALL_NODE`

When building from source with the Maven or Gradle buildpacks, you can enable installation of Node and/or Yarn using this build argument. When set to `true`, FL0 will check for either `yarn.lock` or `package.json` to determine the package manager to use.

Example: `BP_JAVA_INSTALL_NODE=true`

### `BP_NODE_PROJECT_PATH`

When using `BP_JAVA_INSTALL_NODE`, the `yarn.lock` and `package.json` files are expected to be in the root of the project. Use this build argument to override this behavior and set a custom path.

Example: `BP_NODE_PROJECT_PATH=path/to/project`

### `BP_JAVA_APP_SERVER`

Defaults to Apache Tomcat. To override this, specify one of the following:

- `tomcat` - [Apache Tomcat](https://tomcat.apache.org/)
- `tomee` - [Apache Tomee](https://tomee.apache.org/)
- `liberty` - [Open Liberty](https://openliberty.io/)

Example: `BP_JAVA_APP_SERVER=tomee`

## Example Template

An example of the Java Spring Boot with Maven Application can be found in the FL0 templates repository: [fl0zone/template-java-maven](https://github.com/fl0zone/template-java-maven).
