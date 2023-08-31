import fs from 'fs';
import { getReportID, getReportPageData } from '../utils.js';

const reportId = getReportID();
const pageData = getReportPageData();

for (let i = 0; i < pageData.length; i += 1) {
    const page = pageData[i];

    const pageMetadataJSON = JSON.stringify(
        {
            url: page.url,
            id: page.id,
            title: page.title,
            metadata: page.metadata,
            pageLinks: page.links,
        },
        null,
        4,
    );

    fs.mkdirSync(`../data/${reportId}/${page.id}/`, {
        recursive: true,
    });

    fs.writeFileSync(
        `../data/${reportId}/${page.id}/pageMetadata.json`,
        pageMetadataJSON + '\n',
    );
}
