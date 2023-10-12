import fs from 'fs';

import { getRequestSizes, getReportID, getReportPageData } from './loadData.js';

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
function tallyNetworkRequestSizeByType(networkRequests) {
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
 * @returns {Array} - An array of network requests for the page with updated transfer sizes.
 */
const loadRequestTransferSizesForPage = (page, requestSizes) => {
    const pageNetworkRequests = [];

    for (let j = 0; j < page.networkRequests.length; j += 1) {
        const request = page.networkRequests[j];

        if (
            requestSizes[request.url] !== undefined &&
            request.transferSize === 0
        ) {
            request.transferSize = requestSizes[request.url];
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

function processNetworkRequests(pageData, reportUUID, requestSizes) {
    const websitePageWeights = [];
    const websiteNetworkRequestSummary = [];

    for (let i = 0; i < pageData.length; i += 1) {
        const page = pageData[i];

        const pageNetworkRequests = loadRequestTransferSizesForPage(
            page,
            requestSizes,
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

const pageData = getReportPageData();
const reportId = getReportID();
const requestSizes = getRequestSizes(reportId);

// Save the results to a new JSON file in a webpage specific subdirectory
processNetworkRequests(pageData, reportId, requestSizes);
