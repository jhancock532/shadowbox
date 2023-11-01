import React from 'react';
import KeyStatistic from '@/components/KeyStatistic';
import styles from './KeyStatisticsReport.module.scss';

interface KeyStatisticsReportProps {
    networkRequestSummary: any;
    comparedNetworkRequestSummary?: any;
}

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

            {/* <KeyStatistic
                title="Image weight per page"
                number={Math.floor(
                    networkRequestSummary.medianPageWeight / 1000,
                )}
                comparisonNumber={Math.floor(
                    comparedNetworkRequestSummary.medianPageWeight / 1000,
                )}
                units=" kB"
                showPercentageChange
            /> */}
        </div>
    );
};

export default KeyStatisticsReport;
