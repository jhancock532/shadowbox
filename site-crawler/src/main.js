/* eslint-disable no-console */
import { PuppeteerCrawler, Dataset } from 'crawlee';
import { exportReportMetadataToJSON } from './metadataExport.js';
import { router } from './routes.js';

const startUrls = ['https://torchbox.com/careers/employee-owned-trust/'];
let failedURLs = [];

// Documentation: https://crawlee.dev/
const crawler = new PuppeteerCrawler({
    launchContext: {
        launchOptions: {
            headless: true,
        },
    },
    maxRequestsPerCrawl: 10,
    requestHandlerTimeoutSecs: 10,
    requestHandler: router,
    failedRequestHandler: ({ request }, error) => {
        console.error(`Request ${request.url} failed`, error);
        if (failedURLs.includes(request.url)) return;
        failedURLs.push(request.url);
    },
});

await crawler.run(startUrls);

if (failedURLs.length > 0) {
    console.log('Failed URLs:', failedURLs);
} else {
    console.log('No failed URLs');
}

await Dataset.exportToJSON('results', { toKVS: 'output' });
console.log('Exported Dataset results to JSON');

await exportReportMetadataToJSON();
console.log('Exported report metadata to JSON');
