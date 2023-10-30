# Todo

## Implementation questions

### Should we wait for a few seconds before running the page analysis?

I've added a function that scrolls to the bottom of each page before continuing to record network requests. This is to ensure that all lazy-loaded images are loaded before we start the analysis.

## Refactoring

- [ ] Create a header component and include it in the Layout for the report system.
- [ ] Move the `Page.module.scss` out of `styles`
- [ ] A consistent font mixin used throughout the site.

## Features

### Dashboard

- [ ] A button to go back to the parent page.
- [ ] Dark mode
- [ ] KeyStatistic component could have an optional % difference value show
- [ ] Better renderer for report metadata JSON output (code formatting)
- [ ] Page details title to include report date
- [ ] Page details image summary to include a warning icon or tick if the images are optimised or not.
- [ ] Page details font summary

### Crawler

- [ ] A loading bar for the crawler asset download process.
- [ ] Add console log messages to the crawler export stages to show progress.

## Documentation

- How to run the crawler and process its results.

## Bug

- [x] Link mapping in the network request summary chart is broken (now fixed & refactored)
- [ ] PageLinks in pageMetadata.json is empty?
- [ ] Network summary request tooltip with link to page goes to root of site instead of report page or live website page.

### Unknown resources to handle

- Unknown resource type: link https://torchbox.com/static/images/icons/site.cb209cc06aee.webmanifest
- Unknown resource type: link https://torchbox.com/careers/site.webmanifest
