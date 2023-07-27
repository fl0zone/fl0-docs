---
---

# Migrating from Railway

## Is FL0 right for you?

1. You're deploying web services (frontend or backend)
2. You don't need a custom domain
3. You don't use a monorepo

## Feature & Terminology Comparison

Below is a list of Railway features and how they compare in FL0.

- **Projects:** FL0 also has Projects, however they are grouped into a **Workspace**, which is where billing and team members are managed. Workspaces are like organizations or teams.
- **Services:** In FL0, these are called Applications and are always connected to a Github repository.
- **Variables:** FL0 calls these Environment Variables. If you use Dynamic Variables in Railway, you'll need to flatten them to normal values when migrating to Fl0.
- **Environments:** FL0 supports a single environment on Free plans and 2 environments on Pro plans (Dev and Prod).
- **Volumes:** FL0 does not support storage volumes yet, but you can use third party services like AWS S3.
- **Databases:** Support for Postgres is built-in, and you can connect external databases to your service if you use other types such as Mongo or MySQL.
- **Private networking:** In FL0, all your applications are exposed on public URLs but you can communicate from one application from another using its hostname (the name of the application).

## Supported languages

The following table is a list of languages and their support across Railway and FL0. Both platforms provide built-in language support (without the need for a Dockerfile) for common languages. Railway uses [Nixpacks](https://nixpacks.com/) and FL0 uses [Paketo](https://paketo.io).

You can always use a Dockerfile if your language is not covered under a build pack.

| Language | Railway                                                | FL0                                                      |
| -------- | ------------------------------------------------------ | -------------------------------------------------------- |
| Go       | <span class="badge badge--success">Yes</span>          | <span class="badge badge--success">Yes</span>            |
| Java     | <span class="badge badge--success">Yes</span>          | <span class="badge badge--success">Yes</span>            |
| NodeJS   | <span class="badge badge--success">Yes</span>          | <span class="badge badge--success">Yes</span>            |
| PHP      | <span class="badge badge--success">Yes</span>          | <span class="badge badge--success">Yes</span>            |
| Python   | <span class="badge badge--success">Yes</span>          | <span class="badge badge--success">Yes</span>            |
| Ruby     | <span class="badge badge--success">Yes</span>          | <span class="badge badge--success">Yes</span>            |
| .NET     | <span class="badge badge--success">Yes</span>          | <span class="badge badge--success">Yes</span>            |
| Nginx    | <span class="badge badge--success">Yes</span>          | <span class="badge badge--success">Yes</span>            |
| Rust     | <span class="badge badge--success">Yes</span>          | <span class="badge badge--warning">Via Dockerfile</span> |
| Crystal  | <span class="badge badge--success">Yes</span>          | <span class="badge badge--warning">Via Dockerfile</span> |
| Deno     | <span class="badge badge--success">Yes</span>          | <span class="badge badge--warning">Via Dockerfile</span> |
| Haskell  | <span class="badge badge--success">Yes</span>          | <span class="badge badge--warning">Via Dockerfile</span> |
| Swift    | <span class="badge badge--success">Yes</span>          | <span class="badge badge--warning">Via Dockerfile</span> |
| Zig      | <span class="badge badge--success">Yes</span>          | <span class="badge badge--warning">Via Dockerfile</span> |
| Dart     | <span class="badge badge--success">Yes</span>          | <span class="badge badge--warning">Via Dockerfile</span> |
| Elixir   | <span class="badge badge--success">Yes</span>          | <span class="badge badge--warning">Via Dockerfile</span> |
| Bun      | <span class="badge badge--warning">Experimental</span> | <span class="badge badge--warning">Via Dockerfile</span> |

## Pre-requisites

Before we start the deployment process, we need to make sure we have a few things in place.

### FL0 Account

First, we need to make sure we have an account on FL0. If you don't have one, you can sign up for free at [fl0.com](https://fl0.cm).

### Github Account with Admin Access

Next, we need to make sure we have a Github account with admin access to the repo we want to deploy. This is because we will be linking our FL0 account to our Github account, so we can deploy our code directly from Github.

## Steps

Let's start at the beginning, and log into our FL0 account. Once we're logged in, we should see a (beautiful) screen like this:

Now we can start deploying our application to FL0!

### Create a New Project

<!-- If you're just signing up now, you should be prompted to create a new workspace and project. If you're not, you can create a new project by clicking the `New Project` button on your workspace home screen. -->

If this is your first time signing up for FL0, you should be prompted to create a new workspace and project. If you're not, you can create a new project by clicking the `New Project` button on your workspace home screen.

<!-- LINK New Project -->

After creating a new project, we can move on to the next step.

### Create a New Database

Since our app is probably going to require some sort of way to persist data, we should create a new database first. We can do this by clicking the `Add New` dropdown and selecting `Postgres Database`. Give a name to your database, and click the Create button. And voila! We have a new database.

<!-- LINK New Database Creation -->

If you head over to the `Connection Info` tab, you should see all of the information you need to connect to your database.

### Create a New Service

Now that we have a database, we can create a new service. We can do this by clicking the `Add New` dropdown and selecting `Application`. We will be prompted to link our Github account, so we can deploy our code directly from Github.

<!-- LINK Github Linking -->

Once we link our Github account, we can select the repo we want to deploy and click `Connect`

<!-- LINK Repo Selection -->

We can now give a custom name to our service and select which branch we want to deploy. We can also optionally add any environment variables we need for our application. We can do this by clicking the `Add Environment Variables` button. Let's do that now.

<!-- LINK Env Var Creation -->

**One thing to note is that our application needs to listen on the port number `$PORT` because FL0 will dynamically assign a port number to our application.**

We can now finally deploy our application! We can do this by clicking the `Deploy your Application` button, sit back and watch the magic happen.

### Add more Environment Variables

Oh, no! We forgot to add some environment variables! No worries, we can add them now. We can do this by clicking the `+ Environment Variables` button. Let's do that now.

<!-- LINK Env Var Creation -->

Once we have added our environment variables, we must redeploy our application for the changes to take effect. We can do this by navigating to the `Deployments` tab, and clicking the `Deploy Manually` button.

### Configure our Application

Now that our application is deployed, we can configure how we want the deployment to behave. We can do this from the `Settings` tab.

The first setting we can look at is the `Custom URL`. We can configure a custom unique subdomain for our application, given that someone else hasn't already beat us to the punch.

If we look under the Scalability sub-section, we can configure two essential settings:

1. Compute
2. Auto Scaling

The `Compute` setting allows us to configure how much CPU and RAM we want to allocate to our application. The `Auto Scaling` setting allows us to configure how many instances of our application we want to run. We can configure the minimum and maximum number of instances we want to run at any given time.

- others

  - Database Must be postgres
  - Only one service per project
  - Health check and health check timeout
    - i think fl0 checks if the main process exits ??
  - no Custom domains
  - no private/internal networking b/n services
  - ? no attachable volumes
  - ? URL format differences

- Limitations
  - Only Postgres
  - Only one service per project
  - ? Might need to listen on $PORT
