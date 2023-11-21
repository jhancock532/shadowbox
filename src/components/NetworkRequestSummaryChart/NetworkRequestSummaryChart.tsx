'use client';

import React from 'react';

import { processNetworkRequestData } from './processNetworkRequestChartData';
import { NetworkRequestBar } from './NetworkRequestBar';
import styles from './NetworkRequestSummaryChart.module.scss';

type NetworkRequestSummaryChartProps = {
    data: any;
    comparedData?: any;
    largestPageWeight: number;
    linkMapping: any;
    reportId: string;
    comparedReportId?: string | null;
};

const NetworkRequestSummaryChart: React.FC<NetworkRequestSummaryChartProps> = ({
    data,
    comparedData,
    largestPageWeight,
    linkMapping,
    reportId,
    comparedReportId,
}) => {
    const [displayedBars, setDisplayedBars] = React.useState(15);

    const sortedChartItems = processNetworkRequestData(
        data,
        comparedData,
        linkMapping,
        reportId,
        comparedReportId,
    );

    return (
        <div className={styles.container}>
            {sortedChartItems
                .slice(0, displayedBars)
                .map((data: any, index: number) => (
                    <NetworkRequestBar
                        key={index}
                        maxPossibleValue={largestPageWeight}
                        networkRequestData={data}
                    />
                ))}

            {displayedBars < sortedChartItems.length && (
                <button
                    className={styles.showMoreButton}
                    onClick={() => setDisplayedBars(displayedBars + 15)}
                >
                    Show more
                </button>
            )}
        </div>
    );
};

export default NetworkRequestSummaryChart;
