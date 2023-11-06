import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import {
    loadReportNetworkRequestSummary,
    loadListOfReportWebpageMetadata,
    loadReportMetadata,
    loadRequestSizes,
} from '@/utils/loadFileData';

import NetworkRequestSummaryChart from '@/components/NetworkRequestSummaryChart';
import KeyStatisticsReport from '@/components/KeyStatisticsReport';
import FontOverview from '@/components/SiteWideReports/FontOverview';
import ImageOverview from '@/components/SiteWideReports/ImageOverview';

import styles from './ReportPage.module.scss';

export default function Report({ params }: any) {
    const networkRequestSummary = loadReportNetworkRequestSummary(
        params.reportId,
    );
    const webpageMetadata = loadListOfReportWebpageMetadata(params.reportId);
    const reportMetadata = loadReportMetadata(params.reportId);
    const requestSizes = loadRequestSizes(params.reportId);

    const comparedReportId = cookies().get('compared-report-id')?.value || null;

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
        comparedReportMetadata = loadReportMetadata(comparedReportId);
        comparedRequestSizes = loadRequestSizes(comparedReportId);

        comparedNetworkRequestSummary =
            loadReportNetworkRequestSummary(comparedReportId);

        linkMapping.comparedReportId = comparedReportId;
        linkMapping.comparedLinks = comparedReportMetadata.urlToIdMapping;

        if (
            comparedNetworkRequestSummary.largestPageWeight > largestPageWeight
        ) {
            largestPageWeight = comparedNetworkRequestSummary.largestPageWeight;
        }
    }

    return (
        <main>
            <h1 className={styles.title}>
                Website overview{comparedReportId ? ' comparison' : ''}
            </h1>

            <h2 className={styles.secondaryTitle}>Key statistics</h2>

            <KeyStatisticsReport
                networkRequestSummary={networkRequestSummary}
                comparedNetworkRequestSummary={comparedNetworkRequestSummary}
            />

            <h2 className={styles.secondaryTitle}>
                Largest webpages by resource size
            </h2>

            <p>
                Hover over bars to see more information, and click on the bar
                for a detailed analysis of that page.
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

            <h2 className={styles.secondaryTitle}>Report metadata</h2>

            <p>
                Additional information about the report and crawling of the
                website.
            </p>

            <details className={styles.details}>
                <summary>List of webpage urls analyzed in this report</summary>
                <ul className={styles.details__list}>
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

            <details className={styles.details}>
                <summary>Crawler statistics</summary>

                <div className={styles.code}>
                    {JSON.stringify(reportMetadata)}
                </div>
            </details>
        </main>
    );
}
