---
---

# Java

It is simple to deploy a Java application onto the FL0 platform. This example details getting started with Maven and Spring Boot - typically a standard Maven configuration _should_ be able to be built with the [Paketo Buildpacks](https://github.com/paketo-buildpacks/) that are used.

## Binding to the right port

By default FL0 will expect you to listen on port `8080`, however this is configurable. The platform will inject the `PORT` environment variable when starting your application and you should bind to this. You can also set which port the platform will expect you to listen on by setting the `PORT` environment variable in the `Environemnt Variables` section of your service.

### Spring Boot

We can configure Spring to use the PORT env var as such, if the `PORT` environment variable is set we will use the value of it (it will always be set in FL0) otherwise we will fall back to `8080`:

```java 
    SpringApplication app = new SpringApplication(DemoApplication.class);
    String port = System.getenv("PORT");
    app.setDefaultProperties(Collections.singletonMap("server.port", port == null ? "8080" : port));
    app.run(args);
```

## Example Template

An example of the Java Spring Boot with Maven Application can be found in the FL0 templates repository: [fl0zone/template-java-maven](https://github.com/fl0zone/template-java-maven).
