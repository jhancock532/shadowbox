import fs from 'fs';

import {
    saveNetworkRequestsToFileSystem,
    getNetworkRequestSizes,
    // TEST_REQUEST_SIZES,
    getReportID,
} from '../utils.js';

const pageData = JSON.parse(
    fs.readFileSync('./storage/key_value_stores/output/results.json', 'utf8'),
);

const reportId = getReportID();
const requestSizes = await getNetworkRequestSizes(pageData);

// Save the results to a new JSON file in a webpage specific subdirectory

saveNetworkRequestsToFileSystem(pageData, reportId, requestSizes);
