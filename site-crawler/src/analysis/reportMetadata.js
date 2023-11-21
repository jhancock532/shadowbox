import fs from 'fs';

const metadata = JSON.parse(
    fs.readFileSync(
        './storage/key_value_stores/output/reportMetadata.json',
        'utf8',
    ),
);

const pageData = JSON.parse(
    fs.readFileSync('./storage/key_value_stores/output/results.json', 'utf8'),
);

const reportId = metadata.reportId;
const reportDateTime = metadata.crawlerStartedAt;

const urlToIdMapping = [];

for (let i = 0; i < pageData.length; i += 1) {
    const page = pageData[i];

    urlToIdMapping.push({
        [page.url]: page.id,
    });
}

const reportMetadata = {
    reportId,
    reportDateTime,
    crawlerStatistics: {
        ...metadata,
    },
    urlToIdMapping,
};

const metadataJSON = JSON.stringify(reportMetadata, null, 4);

fs.writeFileSync(`../data/${reportId}/metadata.json`, metadataJSON + '\n');
