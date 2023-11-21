import React from 'react';
import BarChart from '@/components/BarChart';
import { BarChartItem } from '@/types/types';
import styles from '../OverviewReportStyles.module.scss';

type IframeOverviewProps = {
    iframes: any;
    comparedIframes: any;
};

// Todo: useful approximation but not accurate.
// Vimeo video could include Youtube in its title.
function getTypeOfIframe(iframe: any) {
    if (iframe.title.includes('YouTube')) {
        return 'YouTube';
    }
    if (iframe.title.includes('Vimeo')) {
        return 'Vimeo';
    }
    if (iframe.title.includes('Facebook')) {
        return 'Facebook';
    }
    if (iframe.title.includes('Twitter')) {
        return 'Twitter';
    }
    if (iframe.title.includes('Instagram')) {
        return 'Instagram';
    }
    if (iframe.title.includes('TikTok')) {
        return 'TikTok';
    }
    if (iframe.title.includes('SoundCloud')) {
        return 'SoundCloud';
    }
    if (iframe.title.includes('Spotify')) {
        return 'Spotify';
    }

    return 'Other';
}

function generateIframeChartData(iframes: any) {
    const iframeTally = [] as any;

    iframes.forEach((iframe: any) => {
        const iframeType = getTypeOfIframe(iframe);
        iframeTally[iframeType] = iframeTally[iframeType]
            ? iframeTally[iframeType] + 1
            : 1;
    });

    const chartData: BarChartItem[] = [];

    Object.keys(iframeTally).forEach((key) => {
        const item = iframeTally[key];

        chartData.push({
            key: key,
            value: item,
            label: item,
        });
    });

    return chartData;
}

export function IframeOverview({
    iframes,
    comparedIframes,
}: IframeOverviewProps) {
    const chartData = generateIframeChartData(iframes);

    let comparedChartData;

    if (comparedIframes) {
        comparedChartData = generateIframeChartData(comparedIframes);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Iframe overview</h2>
            <p>
                While crawling the site, <strong>{iframes.length}</strong>{' '}
                iframes were found.
            </p>

            {comparedIframes && (
                <p>
                    <strong>{comparedIframes.length}</strong> were found in the
                    compared report.
                </p>
            )}

            <BarChart data={chartData} comparisonData={comparedChartData} />
        </div>
    );
}
