import Link from 'next/link';
import { cookies } from 'next/headers';
import {
    loadReportNetworkRequestSummary,
    loadListOfReportWebpageMetadata,
    loadReportMetadata,
} from '@/utils/loadFileData';

import styles from '@/styles/Page.module.scss';
import KeyNumber from '@/components/KeyNumber';

export default function Report({ params }: any) {
    const networkRequestSummary = loadReportNetworkRequestSummary(
        params.reportId,
    );
    const webpageMetadata = loadListOfReportWebpageMetadata(params.reportId);
    const reportMetadata = loadReportMetadata(params.reportId);

    const comparedReportId = cookies().get('compared-report-id')?.value || null;

    let comparedNumberOfWebpages;

    if (comparedReportId) {
        const comparedWebpageMetadata =
            loadListOfReportWebpageMetadata(comparedReportId);
        comparedNumberOfWebpages = comparedWebpageMetadata.length;
    }

    const numberOfWebpages = webpageMetadata.length;

    return (
        <main>
            <h1 className={styles.title}>Website overview report</h1>

            <div className={styles.keyStatisticsContainer}>
                <KeyNumber
                    title="Page count"
                    number={numberOfWebpages}
                    comparisonNumber={comparedNumberOfWebpages}
                />

                <KeyNumber
                    title="Average page weight"
                    number={numberOfWebpages}
                    comparisonNumber={comparedNumberOfWebpages}
                />
            </div>

            <details>
                <summary>Webpages analysed</summary>

                <ul>
                    {webpageMetadata.map((webpage: any) => {
                        return (
                            <li key={webpage.webpageID}>
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

            <details>
                <summary>Network request summary </summary>

                {JSON.stringify(networkRequestSummary)}
            </details>

            <details>
                <summary>Report metadata</summary>

                {JSON.stringify(reportMetadata)}
            </details>
        </main>
    );
}
