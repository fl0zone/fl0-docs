---
sidebar_position: 1
slug: /
---

# Introduction

## What is FL0?

FL0 is a platform that makes it really simple to deploy your code as a web service.
FL0 can build your code into a container using one of two methods:

1. Building a Dockerfile that you provide in your repo
2. By automatically detecting your codebase

Once built, we deploy it to your Dev environment on FL0 and provide you with a unique URL.
Next time you push a change to your repo, we repeat the process automatically or manually depending on your chosen settings.

```mermaid
flowchart LR
    code[Your code]
    git[Git repo]
    code -->|push|git
    git -->|deploy| dev
    subgraph workspace [FL0 Workspace]
        subgraph project [Project]
            direction LR
            dev[FL0 Dev]
            prod[FL0 Prod]
            dev -->|promote| prod
            subgraph dev [Dev]
                direction TB
                devApp[App]
                devDb[DB]
                devApp -.-> devDb
            end
            subgraph prod [Prod]
                direction TB
                prodApp[App]
                prodDb[DB]
                prodApp -.-> prodDb
            end
        end
    end
```
