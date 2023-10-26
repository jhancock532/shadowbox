# Todo

## Implementation questions

### Should we wait for a few seconds before running the page analysis?

I've added a function that scrolls to the bottom of each page before continuing to record network requests. This is to ensure that all lazy-loaded images are loaded before we start the analysis.

## Unknown resources to handle

- Unknown resource type: link https://torchbox.com/static/images/icons/site.cb209cc06aee.webmanifest
- Unknown resource type: link https://torchbox.com/careers/site.webmanifest

## Refactoring

- Create a header component and include it in the Layout for the report system.

- Move the `Page.module.scss` out of `styles`

- A consistent font mixin used throughout the site.

## Features

- A button to go back to the parent page.
