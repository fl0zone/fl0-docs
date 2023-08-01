---
---

# .Net

It is simple to deploy a .NET Core application onto the FL0 platform. This example details getting started with ASP.NET Core - typically a standard configuration _should_ be able to be built with the [Paketo Buildpacks](https://github.com/paketo-buildpacks/) that are used.

## Binding to the right port

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

## Example Template

An example of the ASP.NET Core application can be found in the FL0 templates repository: [fl0zone/template-dotnet](https://github.com/fl0zone/template-dotnet).
