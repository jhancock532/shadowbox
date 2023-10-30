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
    const sortedChartItems = processNetworkRequestData(
        data,
        comparedData,
        linkMapping,
        reportId,
        comparedReportId,
    );

    return (
        <div className={styles.container}>
            {sortedChartItems.map((data: any, index: number) => (
                <NetworkRequestBar
                    key={index}
                    maxPossibleValue={largestPageWeight}
                    networkRequestData={data}
                />
            ))}
        </div>
    );
};

export default NetworkRequestSummaryChart;
