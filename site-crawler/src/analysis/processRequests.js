import fs from 'fs';

import {
    getRequestSizes,
    getIframeRequestSizes,
    getReportID,
    getReportPageData,
    getReportIframeData,
} from './loadData.js';

import {
    calculateAverageFromArray,
    calculateMedianFromArray,
} from './statistics.js';

/**
 * Calculates the total transfer size of network requests by type.
 *
 * @param {Array} networkRequests - An array of network request objects.
 * @returns {Object} An object containing the total transfer size of network requests by type.
 */
export function tallyNetworkRequestSizeByType(networkRequests) {
    let output = {};

    for (let i = 0; i < networkRequests.length; i += 1) {
        const request = networkRequests[i];

        if (output[request.resourceType] === undefined) {
            output[request.resourceType] = 0;
        }

        output[request.resourceType] += request.transferSize;
    }

    return output;
}

/**
 * Tally network requests by resource type extension.
 *
 * @param {Array} networkRequests - An array of network requests.
 * @param {string} resourceType - The resource type to filter by.
 * @returns {Object} - An object containing the count and size of each extension.
 */
function tallyNetworkRequestsByResourceTypeExtension(
    networkRequests,
    resourceType,
) {
    let output = {};

    for (let i = 0; i < networkRequests.length; i += 1) {
        const request = networkRequests[i];

        if (request.resourceType === resourceType) {
            const extension = request.fileExtension;

            if (output[extension] === undefined) {
                output[extension] = {
                    count: 1,
                    size: request.transferSize,
                };
            } else {
                output[extension].count += 1;
                output[extension].size += request.transferSize;
            }
        }
    }

    return output;
}

/**
 * Loads request transfer sizes for a given page.
 *
 * @param {Object} page - The page object to load request transfer sizes for.
 * @param {Object} requestSizes - The object containing request sizes.
 * @param {Object} iframeData - The object containing iframe data.
 * @returns {Array} - An array of network requests for the page with updated transfer sizes.
 */
const loadRequestTransferSizesForPage = (page, requestSizes, iframeData) => {
    const pageNetworkRequests = [];

    for (let j = 0; j < page.networkRequests.length; j += 1) {
        const request = page.networkRequests[j];

        if (
            requestSizes[request.url] !== undefined &&
            request.transferSize === 0
        ) {
            request.transferSize = requestSizes[request.url];
        }

        if (request.resourceType === 'iframe') {
            const iframe = iframeData.find(
                (iframe) => iframe.url === request.url,
            );

            if (iframe !== undefined) {
                request.transferSize = iframe.totalSize;
                request.networkRequests = iframe.networkRequests;
                request.resourceSizes = iframe.resourceSizes;
            }
        }

        pageNetworkRequests.push(request);
    }

    return pageNetworkRequests;
};

/**
 * Calculates the total weight of a page based on its network requests.
 *
 * @param {Array} pageNetworkRequests - An array of network requests made by the page.
 * @returns {number} - The total weight of the page in bytes.
 */
const tallyPageWeightFromNetworkRequests = (pageNetworkRequests) => {
    const pageWeight = pageNetworkRequests.reduce(
        (total, request) => total + request.transferSize,
        0,
    );

    return pageWeight;
};

const saveNetworkRequestDetailsForPage = (
    reportUUID,
    pageId,
    networkRequests,
) => {
    const requestsJSON = JSON.stringify(networkRequests, null, 4);

    fs.mkdirSync(`../data/${reportUUID}/${pageId}/`, {
        recursive: true,
    });
    fs.writeFileSync(
        `../data/${reportUUID}/${pageId}/networkRequests.json`,
        requestsJSON + '\n',
    );
};

const saveNetworkRequestsSummary = (
    reportUUID,
    websitePageWeights,
    websiteNetworkRequestSummary,
) => {
    const averagePageWeight = calculateAverageFromArray(websitePageWeights);
    const medianPageWeight = calculateMedianFromArray(websitePageWeights);
    const largestPageWeight = Math.max(...websitePageWeights);

    const requestSummaryJSON = JSON.stringify(
        {
            averagePageWeight,
            medianPageWeight,
            largestPageWeight,
            websiteNetworkRequestSummary,
        },
        null,
        4,
    );

    fs.mkdirSync(`../data/${reportUUID}/`, {
        recursive: true,
    });

    fs.writeFileSync(
        `../data/${reportUUID}/networkRequestsSummary.json`,
        requestSummaryJSON + '\n',
    );
};

function processNetworkRequests(
    pageData,
    iframeData,
    reportUUID,
    requestSizes,
) {
    const websitePageWeights = [];
    const websiteNetworkRequestSummary = [];

    for (let i = 0; i < pageData.length; i += 1) {
        const page = pageData[i];

        const pageNetworkRequests = loadRequestTransferSizesForPage(
            page,
            requestSizes,
            iframeData,
        );

        const pageWeight =
            tallyPageWeightFromNetworkRequests(pageNetworkRequests);
        websitePageWeights.push(pageWeight);

        const networkRequestSizeTallies =
            tallyNetworkRequestSizeByType(pageNetworkRequests);

        const imageFileTallies = tallyNetworkRequestsByResourceTypeExtension(
            pageNetworkRequests,
            'image',
        );

        const fontFileTallies = tallyNetworkRequestsByResourceTypeExtension(
            pageNetworkRequests,
            'font',
        );

        const iframes = pageNetworkRequests.filter(
            (request) => request.resourceType === 'iframe',
        );

        websiteNetworkRequestSummary.push({
            url: page.url,
            networkRequestSizeTallies,
            imageFileTallies,
            fontFileTallies,
        });

        const pageNetworkRequestDetails = {
            url: page.url,
            networkRequests: pageNetworkRequests,
            images: imageFileTallies,
            fonts: fontFileTallies,
            pageWeight,
            iframes,
        };

        saveNetworkRequestDetailsForPage(
            reportUUID,
            page.id,
            pageNetworkRequestDetails,
        );
    }

    saveNetworkRequestsSummary(
        reportUUID,
        websitePageWeights,
        websiteNetworkRequestSummary,
    );
}

const reportId = getReportID();
const pageData = getReportPageData();
const requestSizes = getRequestSizes(reportId);
const iframeData = getReportIframeData();
const iframeRequestSizes = getIframeRequestSizes(reportId);

// Process the iframe data
for (let i = 0; i < iframeData.length; i += 1) {
    const iframe = iframeData[i];

    let totalSize = 0;

    // Update the iframe network requests with accurate transfer sizes
    for (let j = 0; j < iframe.networkRequests.length; j += 1) {
        const request = iframe.networkRequests[j];
        if (request.transferSize === 0) {
            request.transferSize = iframeRequestSizes[request.url];
        }
        totalSize += request.transferSize;
    }

    iframe.totalSize = totalSize;

    iframe.resourceSizes = tallyNetworkRequestSizeByType(
        iframe.networkRequests,
    );
}

const iframesJSON = JSON.stringify(iframeData, null, 4);

fs.writeFileSync(`../data/${reportId}/iframes.json`, iframesJSON + '\n');

// Save the results to a new JSON file in a webpage specific subdirectory
processNetworkRequests(pageData, iframeData, reportId, requestSizes);
