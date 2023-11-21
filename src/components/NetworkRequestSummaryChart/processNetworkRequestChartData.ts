interface LinkMappingPair {
    [key: string]: string; // key represents the url, value the pageId
}

type LinkMapping = {
    baseReportId: string;
    baseLinks: LinkMappingPair[];
    comparedReportId: string;
    comparedLinks: LinkMappingPair[];
};

type WebpageSummary = {
    url: string;
    networkRequestSizeTallies: any;
    imageFileTallies: any;
    fontFileTallies: any;
};

type PairedWebpage = {
    webpage: {
        url: string;
        networkRequestSizeTallies: any;
        imageFileTallies: any;
        fontFileTallies: any;
    } | null;
    webpageReportUrl: string | null;
    comparedWebpage: {
        url: string;
        networkRequestSizeTallies: any;
        imageFileTallies: any;
        fontFileTallies: any;
    } | null;
    comparedWebpageReportUrl: string | null;
};

/**
 * Sums up all network request size.
 * @param networkRequestSizeTallies - An object containing the tallies of network request sizes.
 * @returns the total page weight of a webpage.
 */
const sumNetworkRequestSizeTallies = (
    networkRequestSizeTallies: any,
): number => {
    return Object.values(networkRequestSizeTallies).reduce(
        (a: any, b: any) => a + b,
        0,
    ) as number;
};

/**
 * Generates a report URL from a link mapping object.
 * @param links - The link mapping object.
 * @param url - The URL to generate the report URL for.
 * @param reportId - The ID of the report.
 * @returns The generated report URL, or null if the URL is not found in the link mapping object.
 */
const generateReportUrlFromLinkMapping = (
    links: LinkMappingPair[],
    url: string,
    reportId: string,
) => {
    const mappedUrl = links.find((linkMapping: LinkMappingPair) => {
        return Object.keys(linkMapping)[0] === url;
    });

    if (!mappedUrl) {
        return null;
    }

    const pageId = mappedUrl[url as string];

    return `${reportId}/${pageId}`;
};

/**
 * Pair network request data with its comparison data for a given report.
 * @param data - The network request data for the report.
 * @param comparedData - The network request data for the comparison report.
 * @param linkMapping - The mapping of base and compared links for the report.
 * @param reportId - The ID of the report.
 * @param comparedReportId - The ID of the comparison report.
 * @returns An array of paired webpage objects containing the webpage, its report URL, and its comparison webpage (if available) and its comparison report URL (if available).
 */
const pairNetworkRequestData = (
    data: any,
    comparedData: any,
    linkMapping: any,
    reportId: string,
    comparedReportId?: string | null,
): PairedWebpage[] => {
    const pairedWebpages = data.websiteNetworkRequestSummary.map(
        (webpage: any) => {
            const webpageReportUrl = generateReportUrlFromLinkMapping(
                linkMapping.baseLinks,
                webpage.url,
                reportId,
            );

            // If there's no comparison report, return the webpage as half a PairedWebpage object
            if (!comparedData || !comparedReportId) {
                return {
                    webpage,
                    webpageReportUrl,
                    comparedWebpage: null,
                    comparedWebpageReportUrl: null,
                };
            }

            const comparedWebpage =
                comparedData.websiteNetworkRequestSummary.find(
                    (comparedWebpage: any) => {
                        return comparedWebpage.url === webpage.url;
                    },
                );

            return {
                webpage,
                webpageReportUrl,
                comparedWebpage: comparedWebpage || null,
                comparedWebpageReportUrl: generateReportUrlFromLinkMapping(
                    linkMapping.comparedLinks,
                    webpage.url,
                    comparedReportId,
                ),
            };
        },
    );

    return pairedWebpages;
};

/**
 * Finds unmatched compared webpages from comparedData and returns them as PairedWebpage objects.
 * @param pairedWebpages - An array of PairedWebpage objects that have already been paired up.
 * @param comparedData - The data to compare against.
 * @param comparedReportId - The ID of the report being compared.
 * @param linkMapping - The mapping of links to reports.
 * @returns An array of PairedWebpage objects representing the unmatched compared webpages.
 */
const findUnmatchedComparedWebpages = (
    pairedWebpages: PairedWebpage[],
    comparedData: any,
    comparedReportId: string,
    linkMapping: LinkMapping,
): PairedWebpage[] => {
    // Filter out all the webpages that we've already paired up in pairedWebpages
    const unmatchedComparedWebpageData =
        comparedData.websiteNetworkRequestSummary.filter(
            (comparedWebpage: any) => {
                return !pairedWebpages.find((webpage: any) => {
                    return webpage.webpage.url === comparedWebpage.url;
                });
            },
        ) as WebpageSummary[];

    // Format the unmatchedComparedWebpageData into PairedWebpage objects
    const formattedUnmatchedComparedWebpageData =
        unmatchedComparedWebpageData.map((comparedWebpage: any) => {
            return {
                webpage: null,
                webpageReportUrl: null,
                comparedWebpage,
                comparedWebpageReportUrl: generateReportUrlFromLinkMapping(
                    linkMapping.comparedLinks,
                    comparedWebpage.url,
                    comparedReportId,
                ),
            };
        });

    return formattedUnmatchedComparedWebpageData;
};

/**
 * Sort all the chart data entries by the largest page weight of the base and compared webpage
 * @param pairedWebpages
 * @returns sortedChartItems
 */
const sortChartItems = (pairedWebpages: PairedWebpage[]) => {
    const sortedWebpageData = pairedWebpages.sort((a: any, b: any) => {
        let comparisonValueA = 0;
        let comparisonValueB = 0;

        if (a.webpage) {
            comparisonValueA = sumNetworkRequestSizeTallies(
                a.webpage.networkRequestSizeTallies,
            );
        }

        if (a.comparedWebpage) {
            comparisonValueA = Math.max(
                sumNetworkRequestSizeTallies(
                    a.comparedWebpage.networkRequestSizeTallies,
                ),
                comparisonValueA,
            );
        }

        if (b.webpage) {
            comparisonValueB = sumNetworkRequestSizeTallies(
                b.webpage.networkRequestSizeTallies,
            );
        }

        if (b.comparedWebpage) {
            comparisonValueB = Math.max(
                sumNetworkRequestSizeTallies(
                    b.comparedWebpage.networkRequestSizeTallies,
                ),
                comparisonValueB,
            );
        }

        return comparisonValueB - comparisonValueA;
    });

    return sortedWebpageData;
};

/**
 * Pairs up any webpages with the same URL from both reports,
 * formats the data into PairedWebpage objects for the chart component,
 * then sorts the chart data by the largest page weight to smallest.
 * @returns sortedChartItems
 */
export const processNetworkRequestData = (
    data: any,
    comparedData: any,
    linkMapping: LinkMapping,
    reportId: string,
    comparedReportId?: string | null,
) => {
    // Pair webpages with the same URL from both reports into one PairedWebpage object
    const pairedWebpages = pairNetworkRequestData(
        data,
        comparedData,
        linkMapping,
        reportId,
        comparedReportId,
    );

    // If there's a page in the comparison report that doesn't have a match in the base report,
    // add it to the pairedWebpages array as half filled PairedWebpage object
    if (comparedData?.websiteNetworkRequestSummary && comparedReportId) {
        const unmatchedComparedWebpageData = findUnmatchedComparedWebpages(
            pairedWebpages,
            comparedData,
            comparedReportId,
            linkMapping,
        );
        pairedWebpages.push(...unmatchedComparedWebpageData);
    }

    // Sort the chart data by the largest page weight to smallest before returning it
    return sortChartItems(pairedWebpages);
};
