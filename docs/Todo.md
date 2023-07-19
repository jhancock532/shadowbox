# Todo List

## Bugs

When crawling next.js, the images don't load in until the page is scrolled down to when they are in view. Auto scrolling of the page on load should occur before fetching all the performance statistics.

## Todo

- [ ] Set up SCSS modules

## Feature Ideas

- A bootstrap script or similar for users to fork this app, provide an env variable for the URL to test, an env for the website title, and have it run the analysis and deploy to github pages on push.
- Chart plotting all the images loaded for each webpage by size, sort by format.
- Chart plotting the page weight taken up by embedded content for each page. (Youtube, Vimeo, etc.)
- Chart plotting the time taken for each page to load.
- Option to filter the chart by all pages that are greater than a certain size.
- Chart including all the embeds used on all the pages.
- List of all the domains requests are made to, sorted by the number of requests made to each domain.
