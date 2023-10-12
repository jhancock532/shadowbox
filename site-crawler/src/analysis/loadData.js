import fs from 'fs';
import https from 'https';

export function getReportID() {
    return JSON.parse(
        fs.readFileSync(
            './storage/key_value_stores/output/reportMetadata.json',
            'utf8',
        ),
    ).reportId;
}

export function getReportPageData() {
    return JSON.parse(
        fs.readFileSync(
            './storage/key_value_stores/output/results.json',
            'utf8',
        ),
    );
}

export function getRequestSizes(reportId) {
    return JSON.parse(
        fs.readFileSync(`../data/${reportId}/requestSizes.json`, 'utf8'),
    );
}

async function getResponseSize(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (response) => {
                let size = 0;
                response.on('data', (chunk) => {
                    size += chunk.length;
                });
                response.on('end', () => {
                    resolve(size);
                });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

// Create a dictionary of all the network requests made while crawling and their resource size
export async function getNetworkRequestSizes(pageData) {
    let requestSizes = {};

    for (let i = 0; i < pageData.length; i += 1) {
        const page = pageData[i];

        for (let j = 0; j < page.networkRequests.length; j += 1) {
            const request = page.networkRequests[j];

            if (request.transferSize !== 0) {
                requestSizes[request.url] = request.transferSize;
            } else {
                // Update any resources which don't have a valid transfer size with their actual transfer size
                // eslint-disable-next-line no-console
                console.log(`Fetching request size: ${request.url}`);
                // eslint-disable-next-line no-await-in-loop
                let transferSize = await getResponseSize(request.url);
                requestSizes[request.url] = transferSize;
            }
        }
    }

    return requestSizes;
}
