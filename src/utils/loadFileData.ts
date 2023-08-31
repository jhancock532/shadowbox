import path from 'path';
import fs from 'fs';

const getDirectories = (source: string) =>
    fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

export const loadListOfReports = () => {
    const reportDataFilePath = path.join(process.cwd(), `data/`);

    const reportFolders = getDirectories(reportDataFilePath);

    const availableReports = reportFolders.map((reportId: any) => {
        const reportFilePath = path.join(
            process.cwd(),
            `data/${reportId}/metadata.json`,
        );
        const reportFileData = fs.readFileSync(reportFilePath);
        return JSON.parse(reportFileData.toString());
    });

    return availableReports;
};

export const loadReportNetworkRequestSummary = (reportId: string) => {
    const networkRequestSummaryFilePath = path.join(
        process.cwd(),
        `data/${reportId}/networkRequestsSummary.json`,
    );

    const networkRequestSummary = JSON.parse(
        fs.readFileSync(networkRequestSummaryFilePath, 'utf8'),
    );

    return networkRequestSummary;
};

export const loadListOfReportWebpageMetadata = (reportId: string) => {
    const reportFilePath = path.join(process.cwd(), `data/${reportId}`);

    const webpageFolders = getDirectories(reportFilePath);

    const webpagesMetadata = webpageFolders.map((pageId: any) => {
        const webpageFilePath = path.join(
            process.cwd(),
            `data/${reportId}/${pageId}/pageMetadata.json`,
        );
        const webpageFileData = fs.readFileSync(webpageFilePath, 'utf8');
        return JSON.parse(webpageFileData);
    });

    return webpagesMetadata;
};

export const loadReportMetadata = (reportId: string) => {
    const reportFilePath = path.join(
        process.cwd(),
        `data/${reportId}/metadata.json`,
    );
    const contents = fs.readFileSync(reportFilePath, 'utf8');
    return JSON.parse(contents);
};

export const loadWebpageNetworkRequests = (
    reportId: string,
    pageId: string,
) => {
    const filePath = path.join(
        process.cwd(),
        `data/${reportId}/${pageId}/networkRequests.json`,
    );

    const contents = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(contents);
};

export const loadWebpageMetadata = (reportId: string, pageId: string) => {
    const filePath = path.join(
        process.cwd(),
        `data/${reportId}/${pageId}/pageMetadata.json`,
    );

    const contents = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(contents);
};
