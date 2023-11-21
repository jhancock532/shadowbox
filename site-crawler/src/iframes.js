import { PuppeteerCrawler, Dataset } from 'crawlee';
import { getReportPageData } from './analysis/loadData.js';
import { iframeRouter } from './routes.js';

/* eslint-disable no-console */

// Find all iframe urls in the results
const pageData = getReportPageData();

const iframeUrls = [];

for (let i = 0; i < pageData.length; i += 1) {
    for (let j = 0; j < pageData[i].networkRequests.length; j += 1) {
        if (pageData[i].networkRequests[j].resourceType === 'iframe') {
            iframeUrls.push(pageData[i].networkRequests[j].url);
        }
    }
}

// Start a new crawler that analyses each iframe url

let failedURLs = [];

// Documentation: https://crawlee.dev/
const crawler = new PuppeteerCrawler({
    launchContext: {
        launchOptions: {
            headless: true,
        },
    },
    requestHandlerTimeoutSecs: 30,
    requestHandler: iframeRouter,
    failedRequestHandler: ({ request }, error) => {
        console.error(`Request ${request.url} failed`, error);
        if (failedURLs.includes(request.url)) return;
        failedURLs.push(request.url);
    },
});

await crawler.run(iframeUrls);

// Export the results to JSON

if (failedURLs.length > 0) {
    console.log('Failed URLs:', failedURLs);
} else {
    console.log('No failed URLs');
}

await Dataset.exportToJSON('iframe_results', { toKVS: 'iframe_output' });
console.log('Exported Dataset results to JSON');
