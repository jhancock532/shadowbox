import Link from 'next/link';
import { cookies } from 'next/headers';
import {
    loadReportNetworkRequestSummary,
    loadListOfReportWebpageMetadata,
    loadReportMetadata,
} from '@/utils/loadFileData';
import KeyStatistic from '@/components/KeyStatistic';

import pageStyles from '@/styles/Page.module.scss';
import NetworkRequestSummaryChart from '@/components/NetworkRequestSummaryChart';
import reportPageStyles from './ReportPage.module.scss';

export default function Report({ params }: any) {
    const networkRequestSummary = loadReportNetworkRequestSummary(
        params.reportId,
    );
    const webpageMetadata = loadListOfReportWebpageMetadata(params.reportId);
    const reportMetadata = loadReportMetadata(params.reportId);

    const comparedReportId = cookies().get('compared-report-id')?.value || null;

    let comparedNumberOfWebpages;
    let comparedMedianPageWeight;
    let comparedNetworkRequestSummary;

    if (comparedReportId) {
        const comparedWebpageMetadata =
            loadListOfReportWebpageMetadata(comparedReportId);
        comparedNumberOfWebpages = comparedWebpageMetadata.length;

        comparedNetworkRequestSummary =
            loadReportNetworkRequestSummary(comparedReportId);
        comparedMedianPageWeight =
            comparedNetworkRequestSummary.medianPageWeight;
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
                />
            </div>

            <p className={reportPageStyles.title}>
                Largest webpages by resource size
            </p>

            <NetworkRequestSummaryChart
                data={networkRequestSummary}
                comparedData={comparedNetworkRequestSummary}
            />

            <br />

            <details>
                <summary>Report page urls</summary>
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
                <summary>Report metadata</summary>

                {JSON.stringify(reportMetadata)}
            </details>

            <br />
            <br />
            <br />
        </main>
    );
}
