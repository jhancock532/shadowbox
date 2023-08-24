import path from 'path';
import fs from 'fs';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import Bar from '@/components/Bar';

const COLOR_SCHEME = [
    '#eb4747',
    '#ebb447',
    '#b4eb47',
    '#47b4eb',
    '#4747eb',
    '#eb47b4',
    '#8884d8',
];

export default function Report({ params }: any) {
    const filePath = path.join(
        process.cwd(),
        `data/${params.date}/networkRequestsSummary.json`,
    );
    const fileData = fs.readFileSync(filePath);
    const statistics = JSON.parse(fileData as unknown as string);

    return (
        <main className={styles.main}>
            <div className={styles.header}>
                <h1>Report overview for {params.date}</h1>
                <p>Network requests by page</p>
            </div>

            {statistics.websiteNetworkRequestSummary.map((page: any) => {
                return (
                    <Link
                        href={`/${params.date}/${page.url.replace(
                            /[^a-zA-Z0-9]/g,
                            '_',
                        )}`}
                        key={page.url}
                    >
                        <Bar
                            key={page.url}
                            title={page.url}
                            values={page.networkRequestSizeTallies}
                            maxValue={
                                statistics.largestWebpageTotalNetworkRequestSize
                            }
                            colors={COLOR_SCHEME}
                        />
                    </Link>
                );
            })}
        </main>
    );
}
