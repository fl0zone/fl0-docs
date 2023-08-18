---
---

# Java

This page explains how to get started with Maven and Spring Boot. With FL0, you can choose to provide a Dockerfile or use our built-in support for Java. A standard Maven configuration can usually be built without the need for a Dockerfile.

## Listening to the right port

FL0 injects an environment variable called PORT into your application's container. Your app must listen on this port. You can override this by providing a different value for `PORT` in the [Environment Variables](../platform/environment-variables) section of your application.

Below is an example of how to do this with Spring Boot:

```java
    SpringApplication app = new SpringApplication(DemoApplication.class);
    String port = System.getenv("PORT");
    app.setDefaultProperties(Collections.singletonMap("server.port", port == null ? "8080" : port));
    app.run(args);
```

## Built-in Language Support

You can build and deploy a Java application without a Dockerfile using FL0's automatic builds. FL0 uses a buildpack system where one or more buildpacks may be applied to your project depending on how it is configured.

### Gradle

This buildpack will be applied if any of the following conditions are met:

1. `<APPLICATION_ROOT>/build.gradle` exists
2. `<APPLICATION_ROOT>/build.gradle.kts` exists

The buildpack will do the following:

- Requests that a JDK be installed
- Links the `~/.gradle` to a layer for caching
- If `<APPLICATION_ROOT>/gradlew` exists
  - Runs `<APPLICATION_ROOT>/gradlew --no-daemon assemble` to build the application
- If `<APPLICATION_ROOT>/gradlew` does not exist
  - Contributes Gradle to a layer with all commands on `$PATH`
  - Runs `<GRADLE_ROOT>/bin/gradle --no-daemon assemble` to build the application
- Removes the source code in `<APPLICATION_ROOT>`, following include/exclude rules

### Maven

This buildpack will participate all the following conditions are met

- Another buildpack requires `maven`, `jvm-application-package` or both
- `<APPLICATION_ROOT>/pom.xml` exists

The buildpack will do the following:

- Requests that a JDK be installed
- Links the `~/.m2` to a layer for caching
- If `<APPLICATION_ROOT>/mvnw` does not exist and `mvn` is not on `$PATH`
  - Contributes Maven or Maven Daemon to a layer with all commands on `$PATH`
  - Runs `<MAVEN_ROOT>/bin/mvn -Dmaven.test.skip=true --no-transfer-progress package` to build the application
  - Caches `$BP_MAVEN_BUILT_ARTIFACT` to a layer
- If `<APPLICATION_ROOT>/mvnw` exists
  - Runs `<APPLICATION_ROOT>/mvnw -Dmaven.test.skip=true --no-transfer-progress package` to build the application
  - Caches `$BP_MAVEN_BUILT_ARTIFACT` to a layer
- If `mvn` is on `$PATH`
  - Runs `mvn -Dmaven.test.skip=true --no-transfer-progress package` to build the application
  - Caches `$BP_MAVEN_BUILT_ARTIFACT` to a layer
- Removes the source code in `<APPLICATION_ROOT>`, following include/exclude rules
- If `$BP_MAVEN_BUILT_ARTIFACT` matched a single file
  - Restores `$BP_MAVEN_BUILT_ARTIFACT` from the layer, expands the single file to `<APPLICATION_ROOT>`
- If `$BP_MAVEN_BUILT_ARTIFACT` matched a directory or multiple files
  - Restores the files matched by `$BP_MAVEN_BUILT_ARTIFACT` to `<APPLICATION_ROOT>`

## Example Template

An example of the Java Spring Boot with Maven Application can be found in the FL0 templates repository: [fl0zone/template-java-maven](https://github.com/fl0zone/template-java-maven).

## System Requirements

To ensure your Spring Boot application starts up quickly and runs well, we reccommend at least `0.75 GB` and `0.75 vCPU` of Compute.

:::caution
Spring Boot applications will not have sufficient resources to run on the fl0 Free Tier.
:::

:::tip
To configure Compute, upgrade to the Pro tier. For details see the [Pricing & Plans](/docs/platform/pricing-plans#upgrading-a-workspace) page.
:::
