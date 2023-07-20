---
sidebar_position: 1
---

# Workspaces

Workspaces in FL0 are home to all your projects, services and databases. A workspace may represent an organization or a team. When you create a FL0 account, we give you a default Workspace to use.

Each Workspace has its own:

1. Users & permissions
2. Billing plan
3. Connection to a Github organization

### Creating Workspaces

You can create additional Workspaces in FL0 by following these steps:

1. Click the arrow next to Workspace breadcrumb in the top-left corner of the interface
2. In the dropdown menu, click **New workspace**
3. Give the Workspace a name

### Switching Workspaces

To switch between Workspaces, click the arrow next to the Workspace breadcrumb in the top-left corner of the interface and select a different Workspace.

### Managing a Team

You can invite users to your workspace and control their permissions:

1. Navigate to the **Workspace settings** tab
2. Select the **Team members** link on the left
3. Click the **Invite team member** button or select an existing to edit their permissions

#### Editing User Permissions

From the [Team members](#managing-a-team) section, select a user to view their details. From there:

1. Give them admin permissions, or
2. Grant permissions to specific projects within the workspace

#### Revoking an Invitation

Once an invitation is sent it's not possible to revoke it, however invitations expire in 24 hours. If the user accepts the invitation, they will appear in the list and can be removed from the workspace.

#### Revoking User Access

From the [Team members](#managing-a-team) section, select a user to view their details. From there, click the **Remove user** button.

### Managing Billing

To manage your plan, upgrade or downgrade:

1. Navigate to the **Workspace settings** tab
2. Select the **Plans** link on the left
3. Click the **Select plan** button to upgrade or downgrade

#### Canceling or Editing Payment Information

1. Navigate to the [Plans](#managing-workspace-billing) page
2. Click the **Edit plan** button
3. A new window will open where you can edit payment details or cancel your plan

### Connecting a Workspace to Github

When deploying a new app, FL0 will retrieve a list of repositories from Github and ask you which one to use. In order to do that, FL0 needs your permission to integrate with Github. Each workspace can be connected to one or more Github organizations.

1. Navigate to the **Workspace settings** tab
2. Select the **Git connections** link on the left
3. Click the **Open Github connection page** button
4. In the popup, install the FL0 Connector into the appropriate Github organization

### Leaving a Workspace

If you no longer wish to be part of a Workspace you can remove yourself by navigating to the [Team members](#managing-a-team) section and clicking the **Leave workspace** button.

### Renaming a Workspace

The ability to rename a workspace will be coming soon!

### Deleting a Workspace

:::danger
**Careful!** Deleting a workspace is permanent, and will delete all your apps and databases, including your Development and Production environments!
:::

1. Navigate to the **Workspace settings** tab
2. Select the **Overview** link on the left
3. Click the **Delete workspace** button in the **Danger zone** section
