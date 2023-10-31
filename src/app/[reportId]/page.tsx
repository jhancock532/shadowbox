import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import {
    loadReportNetworkRequestSummary,
    loadListOfReportWebpageMetadata,
    loadReportMetadata,
    loadRequestSizes,
} from '@/utils/loadFileData';
import KeyStatistic from '@/components/KeyStatistic';
import NetworkRequestSummaryChart from '@/components/NetworkRequestSummaryChart';
import FontReport from '@/components/SiteWideReports/FontReport';
import ImageReport from '@/components/SiteWideReports/ImageReport';

import pageStyles from '@/styles/Page.module.scss';
import reportPageStyles from './ReportPage.module.scss';

export default function Report({ params }: any) {
    const networkRequestSummary = loadReportNetworkRequestSummary(
        params.reportId,
    );
    const webpageMetadata = loadListOfReportWebpageMetadata(params.reportId);
    const reportMetadata = loadReportMetadata(params.reportId);
    const requestSizes = loadRequestSizes(params.reportId);

    const comparedReportId = cookies().get('compared-report-id')?.value || null;

    let comparedNumberOfWebpages;
    let comparedMedianPageWeight;
    let comparedNetworkRequestSummary;
    let comparedReportMetadata;
    let comparedRequestSizes;

    let largestPageWeight = networkRequestSummary.largestPageWeight;

    let linkMapping = {
        baseReportId: params.reportId,
        baseLinks: reportMetadata.urlToIdMapping || [],
        comparedReportId: comparedReportId,
        comparedLinks: [],
    };

    if (comparedReportId) {
        const comparedWebpageMetadata =
            loadListOfReportWebpageMetadata(comparedReportId);
        comparedNumberOfWebpages = comparedWebpageMetadata.length;

        comparedReportMetadata = loadReportMetadata(comparedReportId);
        comparedRequestSizes = loadRequestSizes(comparedReportId);

        comparedNetworkRequestSummary =
            loadReportNetworkRequestSummary(comparedReportId);
        comparedMedianPageWeight =
            comparedNetworkRequestSummary.medianPageWeight;

        linkMapping.comparedReportId = comparedReportId;
        linkMapping.comparedLinks = comparedReportMetadata.urlToIdMapping;

        if (
            comparedNetworkRequestSummary.largestPageWeight > largestPageWeight
        ) {
            largestPageWeight = comparedNetworkRequestSummary.largestPageWeight;
        }
    }

    const numberOfWebpages = webpageMetadata.length;

    return (
        <main>
            <h1 className={pageStyles.title}>
                Website overview{comparedReportId ? ' comparison' : ''}
            </h1>

            <div className={reportPageStyles.keyStatisticsContainer}>
                <KeyStatistic
                    title="Page count"
                    number={numberOfWebpages}
                    comparisonNumber={comparedNumberOfWebpages}
                />

                <KeyStatistic
                    title="Median page weight"
                    number={Math.floor(
                        networkRequestSummary.medianPageWeight / 1000,
                    )}
                    comparisonNumber={Math.floor(
                        comparedMedianPageWeight / 1000,
                    )}
                    units=" kB"
                    showPercentageChange
                />
            </div>

            <h2 className={reportPageStyles.title}>
                Largest webpages by resource size
            </h2>

            <NetworkRequestSummaryChart
                data={networkRequestSummary}
                comparedData={comparedNetworkRequestSummary}
                largestPageWeight={largestPageWeight}
                linkMapping={linkMapping}
                reportId={params.reportId}
                comparedReportId={comparedReportId}
            />

            <ImageReport
                networkRequestSummary={networkRequestSummary}
                comparedNetworkRequestSummary={comparedNetworkRequestSummary}
            />

            <FontReport
                requestSizes={requestSizes}
                comparedRequestSizes={comparedRequestSizes}
            />

            <h2 className={reportPageStyles.title}>Report metadata</h2>

            <details>
                <summary>List of webpage urls analyzed in this report</summary>
                <ul>
                    {webpageMetadata.map((webpage: any, index: number) => {
                        return (
                            <li key={index}>
                                <Link
                                    href={`/${params.reportId}/${webpage.id}`}
                                >
                                    {webpage.url}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </details>

            <br />

            <details>
                <summary>Crawler statistics</summary>

                <div className={reportPageStyles.code}>
                    {JSON.stringify(reportMetadata)}
                </div>
            </details>
        </main>
    );
}
