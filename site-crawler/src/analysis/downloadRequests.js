import fs from 'fs';

import {
    getNetworkRequestSizes,
    getReportID,
    getReportPageData,
    getReportIframeData,
} from './loadData.js';

const reportId = getReportID();

const iframeData = getReportIframeData();
const iframeRequestSizes = await getNetworkRequestSizes(iframeData);
const iframeRequestSizesJSON = JSON.stringify(iframeRequestSizes, null, 4);

const pageData = getReportPageData();
const requestSizes = await getNetworkRequestSizes(pageData);
const requestSizesJSON = JSON.stringify(requestSizes, null, 4);

fs.mkdirSync(`../data/${reportId}/`, {
    recursive: true,
});

fs.writeFileSync(
    `../data/${reportId}/requestSizes.json`,
    requestSizesJSON + '\n',
);

fs.writeFileSync(
    `../data/${reportId}/iframeRequestSizes.json`,
    iframeRequestSizesJSON + '\n',
);
