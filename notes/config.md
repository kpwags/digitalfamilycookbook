# BACK END

## DELETE_USER_MODE

This config can be set to:

-   TRANSFER: Transfers all recipes of the user being deleted to the logged in user
-   DELETE (default): Deletes all recipes attached to the user

# FRONT END

## endpoint

This defines the URL of the backend that the site queries

## perPage

Constant that defines how many recipes should be displayed per page

## siteTitle

The title of the site

## requireLogin

Boolean flag indicating whether someone has to be logged in to view the site

## editMode

Mode indicating which users can edit recipes:

-   ALL: All users can edit all recipes
-   USER: Admins can edit all recipes, users can only edit their own recipes

## publicRegistration

Boolean flag indicating whether you need an invitation code to register for the site
