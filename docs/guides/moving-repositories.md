---
---

# How to Move Repositories

If you need to move your Git repo between organizations, you will need to reconfigure FL0 so it can find the new repo.

### Considerations

Before moving a repository it's important to understand the impact on your FL0 organization:

1. A FL0 organization can only be connected to one Github organization at a time
2. You cannot change the repository connected to a FL0 application, it must be deleted and recreated
3. Deleting and recreating a application will involve downtime unless you run both alongside each other with different names
4. While transferring the repository it will not be possible to push code changes to the application from the point the repo is moved to the point the FL0 application is reconnected
5. Allow 10 minutes per application to complete the migration. Duration can depend on the following factors:
   1. Number of environment variables
   2. Duration of build process

### Moving the repository

1. Transfer the repo to the new owner
2. In FL0, ensure you have a backup of all Development and Production environment variables
3. Delete the application in FL0
4. Create a new application in FL0, connecting it to the new repository location
5. Restore the environment variables
6. Run a new manual deployment to make the environment variables take effect

### Moving the repository (zero downtime)

- Transfer the repo to the new owner
- In FL0, ensure you have a backup of all Development and Production environment variables
- Create a new application in FL0 with a new name, connecting it to the new repository location
- Copy the environment variables, adjusting any references to the application URL
- Run a new manual deployment to make the environment variables take effect
- Switch any external applications to use the new application URL such as websites, mobile apps, webhooks, etc.
- Delete the old FL0 application once satisfied that no traffic is hitting it
