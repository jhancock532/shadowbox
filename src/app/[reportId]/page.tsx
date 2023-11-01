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
import FontOverview from '@/components/SiteWideReports/FontOverview';
import ImageOverview from '@/components/SiteWideReports/ImageOverview';

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

            <h2 className={reportPageStyles.title}>Key statistics</h2>

            <div className={reportPageStyles.keyStatisticsContainer}>
                <KeyStatistic
                    title="Pages analyzed"
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

            <p>
                Hover over bars to see the page URL, and click on the bar for a
                detailed analysis of that page.
            </p>

            <NetworkRequestSummaryChart
                data={networkRequestSummary}
                comparedData={comparedNetworkRequestSummary}
                largestPageWeight={largestPageWeight}
                linkMapping={linkMapping}
                reportId={params.reportId}
                comparedReportId={comparedReportId}
            />

            <ImageOverview
                networkRequestSummary={networkRequestSummary}
                comparedNetworkRequestSummary={comparedNetworkRequestSummary}
            />

            <FontOverview
                requestSizes={requestSizes}
                comparedRequestSizes={comparedRequestSizes}
            />

            <h2 className={reportPageStyles.title}>Report metadata</h2>

            <p>
                Additional information about the report and crawling of the
                website.
            </p>

            <details className={reportPageStyles.details}>
                <summary>List of webpage urls analyzed in this report</summary>
                <ul className={reportPageStyles.details__list}>
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

            <details className={reportPageStyles.details}>
                <summary>Crawler statistics</summary>

                <div className={reportPageStyles.code}>
                    {JSON.stringify(reportMetadata)}
                </div>
            </details>
        </main>
    );
}
