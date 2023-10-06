---
sidebar_position: 4
---

# Applications

With FL0 you can take your code and turn it into a working application, deployed as containers in our fully managed infrastructure.

Apps can provide REST or GraphQL APIs, run scheduled jobs, perform batch processing or any other kind of backend processes.

```mermaid
flowchart
    workspace1[Workspace]
    project1[Project]
    workspace1 --> project1
    project1 --> app1
    project1 --> db1
    project1 --> app2
    project1 --> db2
    subgraph prod [Production]
        class prod cssClass
        app2[Application]
        db2[Database]
    end
    subgraph dev [Development]
        app1[Application]
        db1[Database]
    end
    classDef highlight fill:#6de5df,color:#000;
    class app1,app2 highlight;
```

### Creating Apps

#### Requirements

In order to create an app in FL0, you must have the following:

1. Your code stored in a Github repository
2. Admin permissions to the Github organization

#### Connecting to Github

See the section on [Connecting a Workspace to Github](/docs/platform/workspaces.md#connecting-a-workspace-to-github).

#### Naming the App

The name you give your app will become part of the hostname of the app. See the section on [Using the App](#using-the-app) for more information.

#### Automatic vs Manual Deployments

By default, FL0 is configured to automatically deploy the latest version your app whenever a commit is pushed to your chosen branch. You can also choose to manually deploy your code based on a nominated branch or commit hash.

#### Configuring Environment Variables

See the section below on [Environment Variables](#environment-variables).

### Using the App

Every app is given a unique URL that is comprised of the following elements:

```
https://{{app-name}}-{{unique-identifier}}-{{environment}}.fl0.io
```

1. `{{app-name}}` is the name you chose when creating the app
2. `{{unique-identifier}}` is a randomly generated 4 character string
3. `{{environment}}` refers to the environment in which the app is deployed
   1. The same app will have a different URL in Development vs Production

Once successfully deployed, you can access your app using the URL found on the **App Overview** page.

### Environment Variables

Environment variables are custom settings that can be passed into your app when FL0 deploys it. These settings can have different values in Development and Production.

Common scenarios where you might need to use Environment Variables include:

1. Storing database credentials
2. Storing other sensitive information that you don't want stored in Git
3. Configuring environment-specific settings, like log levels or debug modes

![Environment Variables](./assets/environment-variables.png)

To set Environment Variables:

1. Navigate to your application and click on the **Environment Variables** tab. Make sure you're in the correct Environment (dev or prod)
2. Add a new row to the table by clicking the **Add new variable** button
3. Give the variable a name. Names can only include alpha-numeric characters or underscores
4. Set a value for the variable. Optionally mark it as secret, so it can't be read by others
5. Click the **Save** or **Save and deploy** button. Changes to Environment Variables will not take effect until the next deployment

:::caution
Secret environment variables can still be read by your application. Developers must be careful to not write secret environment variables to logs or output them in any way.
:::

### Viewing Logs

Logs from the containers running your apps can be found on the **Logs** tab.

1. If multiple containers are running, you can select the instance (container) to view from the dropdown
2. You can download logs from a specific date range by clicking the **Download logs** button

### Scaling Applications

Application CPU and RAM can be scaled up and down depending on your requirements.
Navigate to **Settings > Scalability** inside your application adjust the defaults.

- **Compute:** The amount of CPU and RAM to give each instance of your application.
- **Autoscaling:** FL0 can automatically scale your app horizontally when the CPU reaches an average of 70%. You can set limits on the min and max number of instances

![App scaling](./assets/app-scaling.png)
