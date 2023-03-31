# Todo List

## Done

- [x] Update the analysis script to use Chome-Har-Capturer's better console logging setup
- [x] When sorting by a request type, that request type should show as the leftmost column in the stacked bar chart.
- [x] Average / median webpage transfer size plotted on x-axis.
- [x] The ability to view all the pages within a specific path subdirectory.
- [x] Sorting by xhr doesn't work

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
