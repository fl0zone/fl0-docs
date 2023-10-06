---
title: .NET
---

# .NET

Below is an example .NET Dockerfile designed to work well locally and on FL0.

:::info
Keep in mind you'll need to alter this to work with your specific file structure.
:::

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
