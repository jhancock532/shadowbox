import React from 'react';

import { NetworkRequestBar } from './NetworkRequestBar';
import styles from './NetworkRequestSummaryChart.module.scss';

type NetworkRequestSummaryChartProps = {
    data: any;
    comparedData?: any;
    largestPageWeight: number;
    linkMapping: any;
    reportId: string;
    comparedReportId?: string | null;
};

const sumNetworkRequestSizeTallies = (
    networkRequestSizeTallies: any,
): number => {
    return Object.values(networkRequestSizeTallies).reduce(
        (a: any, b: any) => a + b,
        0,
    ) as number;
};

const processNetworkRequestData = (
    data: any,
    comparedData: any,
    linkMapping: any,
    reportId: string,
    comparedReportId?: string | null,
) => {
    // Pair the data of the two reports together
    const pairedWebpageData = data.websiteNetworkRequestSummary.map(
        (webpage: any) => {
            if (!comparedData) {
                return {
                    webpage,
                    webpageReportUrl: `${reportId}/${
                        Object.values(
                            linkMapping.baseLinks.find((linkMapping: any) => {
                                return (
                                    Object.keys(linkMapping)[0] === webpage.url
                                );
                            }),
                        )[0]
                    }`,
                    comparedWebpage: null,
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
                webpageReportUrl: `${reportId}/${
                    Object.values(
                        linkMapping.baseLinks.find((linkMapping: any) => {
                            return Object.keys(linkMapping)[0] === webpage.url;
                        }),
                    )[0]
                }`,
                comparedWebpage: comparedWebpage || null,
                comparedWebpageReportUrl: `${comparedReportId}/${
                    Object.values(
                        linkMapping.comparedLinks.find((linkMapping: any) => {
                            return (
                                Object.keys(linkMapping)[0] ===
                                comparedWebpage.url
                            );
                        }),
                    )[0]
                }`,
            };
        },
    );

    // If there's a page in the compared webpage data that doesn't have a match in the original data, add it to final result
    if (comparedData?.websiteNetworkRequestSummary) {
        const unmatchedComparedWebpageData =
            comparedData.websiteNetworkRequestSummary.filter(
                (comparedWebpage: any) => {
                    return !pairedWebpageData.find((webpage: any) => {
                        return webpage.webpage.url === comparedWebpage.url;
                    });
                },
            );

        const formattedUnmatchedComparedWebpageData =
            unmatchedComparedWebpageData.map((comparedWebpage: any) => {
                return {
                    webpage: null,
                    comparedWebpage,
                    comparedWebpageReportUrl: `${comparedReportId}/${linkMapping.comparedLinks.find(
                        (linkMapping: any) => {
                            return (
                                Object.keys(linkMapping)[0] ===
                                comparedWebpage.url
                            );
                        },
                    )}`,
                };
            });

        pairedWebpageData.push(...formattedUnmatchedComparedWebpageData);
    }

    const sortedWebpageData = pairedWebpageData.sort((a: any, b: any) => {
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

const NetworkRequestSummaryChart: React.FC<NetworkRequestSummaryChartProps> = ({
    data,
    comparedData,
    largestPageWeight,
    linkMapping,
    reportId,
    comparedReportId,
}) => {
    const sortedWebpageData = processNetworkRequestData(
        data,
        comparedData,
        linkMapping,
        reportId,
        comparedReportId,
    );

    return (
        <div className={styles.container}>
            {sortedWebpageData.map((data: any, index: number) => {
                return (
                    <NetworkRequestBar
                        key={index}
                        maxPossibleValue={largestPageWeight}
                        networkRequestData={data}
                    />
                );
            })}
        </div>
    );
};

export default NetworkRequestSummaryChart;

/*
{"averagePageWeight":714493,"medianPageWeight":645013,"largestWebpageTotalNetworkRequestSize":866217,
"websiteNetworkRequestSummary":
[{"url":"https://torchbox.com/careers/employee-owned-trust","networkRequestSizeTallies":{"document":94472,"font":186404,"stylesheet":9253,"script":354884}},
{"url":"https://torchbox.com/digital-products/","networkRequestSizeTallies":{"document":12233,"stylesheet":21313,"image":267155,"script":320701,"font":244815}},
{"url":"https://torchbox.com/","networkRequestSizeTallies":{"document":9668,"stylesheet":21313,"script":320701,"font":184787,"image":95780}}]}
*/
