import React from 'react';
import KeyStatistic from '@/components/KeyStatistic';
import styles from './KeyStatisticsReport.module.scss';

interface KeyStatisticsReportProps {
    networkRequestSummary: any;
    comparedNetworkRequestSummary?: any;
}

const calculateAverageImagePageWeight = (networkRequestSummary: any) => {
    const totalImageWeight =
        networkRequestSummary.websiteNetworkRequestSummary.reduce(
            (acc: number, webpage: any) => {
                if (webpage.networkRequestSizeTallies.image) {
                    return acc + webpage.networkRequestSizeTallies.image;
                }
                return acc;
            },
            0,
        );

    return Math.floor(
        totalImageWeight /
            networkRequestSummary.websiteNetworkRequestSummary.length /
            1000,
    );
};

const KeyStatisticsReport: React.FC<KeyStatisticsReportProps> = ({
    networkRequestSummary,
    comparedNetworkRequestSummary,
}) => {
    const numberOfWebpages =
        networkRequestSummary.websiteNetworkRequestSummary.length;
    const medianPageWeight = Math.floor(
        networkRequestSummary.medianPageWeight / 1000,
    );

    const comparedNumberOfWebpages = comparedNetworkRequestSummary
        ? comparedNetworkRequestSummary.websiteNetworkRequestSummary.length
        : undefined;
    const comparedMedianPageWeight = comparedNetworkRequestSummary
        ? Math.floor(comparedNetworkRequestSummary.medianPageWeight / 1000)
        : undefined;

    const averageImagePageWeight = calculateAverageImagePageWeight(
        networkRequestSummary,
    );
    const comparedAverageImagePageWeight = comparedNetworkRequestSummary
        ? calculateAverageImagePageWeight(comparedNetworkRequestSummary)
        : undefined;

    return (
        <div className={styles.container}>
            <KeyStatistic
                title="Pages analyzed"
                number={numberOfWebpages}
                comparisonNumber={comparedNumberOfWebpages}
            />

            <KeyStatistic
                title="Median page weight"
                number={medianPageWeight}
                comparisonNumber={comparedMedianPageWeight}
                units=" kB"
                showPercentageChange
            />

            <KeyStatistic
                title="Average image page weight"
                number={averageImagePageWeight}
                comparisonNumber={comparedAverageImagePageWeight}
                units=" kB"
                showPercentageChange
            />
        </div>
    );
};

export default KeyStatisticsReport;
