const WEBSITE_URL = 'https://torchbox.com/';

import { PuppeteerCrawler, Dataset } from 'crawlee';
import { router } from './routes.js';

// For more information, see https://crawlee.dev/

const startUrls = ['https://torchbox.com/'];

let failedURLs = [];

const crawler = new PuppeteerCrawler({
    launchContext: {
        launchOptions: {
            headless: true,
        },
    },
    maxRequestsPerCrawl: 5,
    requestHandlerTimeoutSecs: 10,
    requestHandler: router,
    failedRequestHandler: ({ request }, error) => {
        console.error(`Request ${request.url} failed`, error);
        if (failedURLs.includes(request.url)) return;
        failedURLs.push(request.url);
    },
});

await crawler.run(startUrls);

console.log('Failed URLs:', failedURLs);

await Dataset.exportToJSON('results', { toKVS: 'output' });

console.log('Exported all results to JSON.');
