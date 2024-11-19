# Todo

## Implementation questions

### Should we wait for a few seconds before running the page analysis?

I've added a function that scrolls to the bottom of each page before continuing to record network requests. This is to ensure that all lazy-loaded images are loaded before we start the analysis.

## Refactoring

- [x] Create a header component and include it in the Layout for the report system.
- [x] Move the `Page.module.scss` out of `styles`
- [x] A consistent font mixin used throughout the site.

## Features

### Dashboard

- [x] A button to go back to the parent page.
- [x] Dark mode
- [x] Page details font summary
- [x] Better renderer for report metadata JSON output (code formatting)
- [x] Include warning in report summary outlining pages with poor image optimisation & poor font optimisation.
- [x] KeyStatistic component could have an optional % difference value show
- [x] Page details to include comparison information against the previous report, if page to compare found.
- [x] Include key statistic of total image weight across site / number of site pages.
- [ ] Page details title to include report date
- [ ] Page details image summary to include a warning icon or tick if the images are optimised or not.
- [ ] Convert metadata component to new metadata export from layout routes
- [ ] Organise site reports in chronological order in home page and report comparison dropdowns
- [ ] Add comparison view for embedded content in page details report

### Crawler

- [ ] A loading bar for the crawler asset download process.
- [ ] Add console log messages to the crawler export stages to show progress.
- [ ] Add support for multiple crawler asset download workers working in parallel?

## Documentation

- How to run the crawler and process its results.

## Bug

- [x] Link mapping in the network request summary chart is broken (now fixed & refactored)
- [ ] Crawler - PageLinks in pageMetadata.json is empty for team page profiles?
- [ ] Network summary request tooltip with link to page goes to root of site instead of report page or live website page.
- [ ] Woff2 font files from the careers site only weigh 300, while the same file from the innovation site 46672.
      "https://torchbox.com/careers/fonts/apercu/apercu-bold-pro.woff2": 300,
      "https://torchbox.com/innovation/fonts/apercu-bold-pro.woff2": 46672,
- [ ] Files can be served with the type string `.png` in their name, but actually be sent with the request header of file type `.webp`. In this way the crawler thinks that the sites images haven't been optimized yet, unless it can figure out how to access this request header data.

### Unknown resources to handle

- Unknown resource type: link https://torchbox.com/static/images/icons/site.cb209cc06aee.webmanifest
- Unknown resource type: link https://torchbox.com/careers/site.webmanifest

## Extended functionality

- Instead of fetching performance metrics via `window.performance.getEntries()`, can Puppeteer fetch accurate performance values from the [Chrome devtools protocol](https://chromedevtools.github.io/devtools-protocol/tot/Performance/#method-getMetrics) API of the browser directly?

- Would it be valuable to see how much content is lazy-loaded - the % of data saved by only looking at above the fold content, vs looking at the entire webpage?

- Energy usage when viewing the page.

  - How could the crawler detect heavy runtime use of JS or layered animations?
  - Could the crawler detect support for dark mode, showing dark mode by default, or detect what % of the page uses lighter vs darker colors?

- Support static export of pages with the app router? v14.1.0

- Review how https://yellowlab.tools/ uses [Phantomas](https://github.com/macbre/phantomas) for excellent performance analysis.

- Monitor all requests sent and received via https://crawlee.dev/api/puppeteer-crawler/namespace/puppeteerRequestInterception instead of using the window.getperformancemetrics call
