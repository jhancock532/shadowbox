import dynamic from 'next/dynamic';
import styles from './WebsiteSummary.module.css';

type WebsiteSummaryProps = {
    webpage: any;
};

// Use dynamic import to prevent server-side rendering of the chart
const RequestSummaryChart = dynamic(
    import('./RequestSummaryChart').then((mod) => mod.RequestSummaryChart),
    { ssr: false },
);

const WebsiteSummary = ({ webpage }: WebsiteSummaryProps) => {
    let totalPageSize = 0;

    for (let i = 0; i < webpage.requests.length; i += 1) {
        totalPageSize += webpage.requests[i].transferSize;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                <a target="_blank" rel="noreferrer" href={webpage.title}>
                    {webpage.title}
                </a>
            </h2>
            <p className={styles.keyStatistic}>
                Content load:{' '}
                <strong>{Math.floor(webpage.timings.onContentLoad)}ms</strong>
            </p>
            <p className={styles.keyStatistic}>
                Page load:{' '}
                <strong>{Math.floor(webpage.timings.onLoad)}ms</strong>
            </p>
            <p className={styles.keyStatistic}>
                Total requests: <strong>{webpage.requests.length}</strong>
            </p>
            <p className={styles.keyStatistic}>
                Page weight:{' '}
                <strong>{Math.floor(totalPageSize / 1000)}kb</strong>
            </p>
            <RequestSummaryChart webpage={webpage} />
        </div>
    );
};

export default WebsiteSummary;
