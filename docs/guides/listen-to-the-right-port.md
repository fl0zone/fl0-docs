---
---

# How to Listen to the Right Port

FL0 injects an environment variable called PORT into your application's container. Your app must listen on this port. You can override this by providing a different value for `PORT` in the [Environment Variables](../platform/environment-variables) section of your application.

```mermaid
flowchart LR
    internet[Internet]
    lb[Load Balancer]
    container[Container]
    internet -- Port 443 --> lb
    lb -- PORT env var --> container
```

## What Happens If I Don't?

If your application listens to a different port, like `3000`, FL0's load balancer won't be able to route traffic to your containers. Your app will start, but you'll see an error like the one below when testing your endpoints:

```
upstream connect error or disconnect/reset before headers. reset reason: connection failure
```
