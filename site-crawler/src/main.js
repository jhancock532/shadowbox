/* eslint-disable no-console */
import { PuppeteerCrawler, Dataset } from 'crawlee';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { router } from './routes.js';

// For more information, see https://crawlee.dev/

const startUrls = ['https://torchbox.com/careers/employee-owned-trust/'];

let failedURLs = [];

const crawler = new PuppeteerCrawler({
    launchContext: {
        launchOptions: {
            headless: true,
        },
    },
    maxRequestsPerCrawl: 2,
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

console.log('Exported Dataset results to JSON');

const crawlerStatisticsFilePath = path.join(
    process.cwd(),
    `./storage/key_value_stores/default/SDK_CRAWLER_STATISTICS_0.json`,
);

const crawlerStatisticsJSON = await fs.promises.readFile(
    crawlerStatisticsFilePath,
    'utf8',
);

const reportId = crypto.randomUUID().substring(0, 8);
const crawlerStatistics = JSON.parse(crawlerStatisticsJSON);
crawlerStatistics.reportId = reportId;

const reportMetadataJSON = JSON.stringify(crawlerStatistics, null, 4);

const reportMetadataFilePath = path.join(
    process.cwd(),
    `./storage/key_value_stores/output/reportMetadata.json`,
);

await fs.promises.writeFile(reportMetadataFilePath, reportMetadataJSON + '\n');

console.log('Exported report metadata to JSON');
