import Link from 'next/link';
import {
    loadReportNetworkRequestSummary,
    loadListOfReportWebpageMetadata,
    loadReportMetadata,
} from '@/utils/loadFileData';

import styles from '@/styles/Page.module.scss';
import KeyNumber from '@/components/KeyNumber/KeyNumber';

export default function Report({ params }: any) {
    const networkRequestSummary = loadReportNetworkRequestSummary(
        params.reportId,
    );
    const webpageMetadata = loadListOfReportWebpageMetadata(params.reportId);
    const reportMetadata = loadReportMetadata(params.reportId);

    const numberOfWebpages = webpageMetadata.length;

    return (
        <main>
            <h1 className={styles.title}>Website overview report</h1>

            <KeyNumber title="Page count" number={numberOfWebpages} />

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
