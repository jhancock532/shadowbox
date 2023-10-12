import fs from 'fs';

import {
    getNetworkRequestSizes,
    getReportID,
    getReportPageData,
} from './loadData.js';

const pageData = getReportPageData();
const reportId = getReportID();
const requestSizes = await getNetworkRequestSizes(pageData);

const requestSizesJSON = JSON.stringify(requestSizes, null, 4);

fs.mkdirSync(`../data/${reportId}/`, {
    recursive: true,
});

fs.writeFileSync(
    `../data/${reportId}/requestSizes.json`,
    requestSizesJSON + '\n',
);
