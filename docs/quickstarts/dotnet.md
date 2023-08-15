---
---

# .Net

It is simple to deploy a .NET Core application onto the FL0 platform. This example details getting started with ASP.NET Core - typically a standard configuration _should_ be able to be built with the [Paketo Buildpacks](https://github.com/paketo-buildpacks/) that are used.

## Listening to the right port

By default FL0 will expect you to listen on port `8080`, however this is configurable. The platform will inject the `PORT` environment variable when starting your application and you should bind to this. You can also set which port the platform will expect you to listen on by setting the `PORT` environment variable in the `Environemnt Variables` section of your service.

We can configure the service to use the PORT env var as such, if the `PORT` environment variable is set we will use the value of it (it will always be set in FL0) otherwise we will fall back to `8080`:

```csharp
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
            var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
            webBuilder.UseUrls($"http://*:{port}/");
        });
```

## Built-in Language Support

You can build and deploy a .NET core application without a Dockerfile using FL0's automatic builds. To do this, ensure you have a `*.csproj`, `*.fsproj`, or `*.vbproj` file in the root of your repo.

### Building From a Subdirectory

:::info
Support for subdirectories coming soon. Currently, your app must reside in the root directory of your repository.
:::

## Dockerfile Support

Instead of relying on FL0's [built-in language support](#built-in-language-support) you can provide your own Dockerfile in the root of your repository. FL0 will create a container based on this Dockerfile and deploy it to your environment.

Below is an example multi-stage Dockerfile designed to work well locally and on FL0.

```dockerfile title=/Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:6.0 as build
WORKDIR /app

COPY ./ ./

RUN dotnet publish "./template-dotnet.csproj" -c Release -o ./out/

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
EXPOSE 80
WORKDIR /app
COPY --from=build /app/out/ .
RUN apt-get update && apt-get install -y curl
ENTRYPOINT ["dotnet", "template-dotnet.dll"]
```

## Example Template

An example of the ASP.NET Core application can be found in the FL0 templates repository: [fl0zone/template-dotnet](https://github.com/fl0zone/template-dotnet).
