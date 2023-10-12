import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

/**
 * Saves the crawler statistics and report ID to a JSON file.
 */
export const exportReportMetadataToJSON = async () => {
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

    await fs.promises.writeFile(
        reportMetadataFilePath,
        reportMetadataJSON + '\n',
    );
};
