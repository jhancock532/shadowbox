import path from 'path';
import fs from 'fs';

const getDirectories = (source: string) =>
    fs
        .readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

export const findComparedReportPageId = (
    comparedReportId: string | null,
    pageUrl: string,
) => {
    if (!comparedReportId) {
        return null;
    }

    const reportFilePath = path.join(
        process.cwd(),
        `data/${comparedReportId}/metadata.json`,
    );
    const reportFileData = fs.readFileSync(reportFilePath);
    const reportMetadata = JSON.parse(reportFileData.toString());

    const urlToId = reportMetadata.urlToIdMapping.find(
        (urlToIdMapping: any) => {
            return Object.keys(urlToIdMapping).includes(pageUrl);
        },
    );

    if (urlToId) {
        return urlToId[pageUrl];
    }

    return null;
};

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

    return availableReports.sort(
        (a: any, b: any) =>
            new Date(b.reportDateTime).getTime() -
            new Date(a.reportDateTime).getTime(),
    );
};

export const loadRequestSizes = (reportId: string) => {
    const requestSizesFilePath = path.join(
        process.cwd(),
        `data/${reportId}/requestSizes.json`,
    );

    const requestSizes = JSON.parse(
        fs.readFileSync(requestSizesFilePath, 'utf8'),
    );

    return requestSizes;
};

export const loadIframeData = (reportId: string) => {
    const iframesFilePath = path.join(
        process.cwd(),
        `data/${reportId}/iframes.json`,
    );

    const iframes = JSON.parse(fs.readFileSync(iframesFilePath, 'utf8'));

    return iframes;
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
