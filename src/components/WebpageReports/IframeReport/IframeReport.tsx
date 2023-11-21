import BarChart from '@/components/BarChart';
import { BarChartItem } from '@/types/types';
import { calculateLabelFromBytes } from '@/utils/statistics';
import styles from './IframeReport.module.scss';

const generateEmbedChartData = (requestData: any) => {
    const chartData: BarChartItem[] = [];

    Object.keys(requestData).forEach((key) => {
        chartData.push({
            key: key,
            value: requestData[key],
            tooltip: `${key}s totalling ${Math.floor(
                requestData[key] / 1000,
            )} kB`,
            label: `${Math.floor(requestData[key] / 1000)} kB`,
        });
    });

    return chartData;
};

export const IframeReport = ({ requestData }: any) => {
    if (requestData.iframes === undefined || requestData.iframes.length === 0) {
        return (
            <div>
                <h2>Embedded Content</h2>
                <p>No iframes were detected on this page.</p>
                <p>No comparison information is available for this report.</p>
            </div>
        );
    }

    const totalWeightOfIframes = requestData.iframes.reduce(
        (total: number, iframe: any) => {
            return total + parseInt(iframe.transferSize, 10);
        },
        0,
    );

    const sortedIframes = requestData.iframes.sort((a: any, b: any) => {
        return parseInt(b.transferSize, 10) - parseInt(a.transferSize, 10);
    });

    return (
        <div>
            <h2>Embedded Content</h2>

            <p>
                {requestData.iframes.length} iframes were detected, adding{' '}
                <strong>{calculateLabelFromBytes(totalWeightOfIframes)}</strong>{' '}
                to the weight of the page. Consider using less, or not adding
                iframes to the page until the user interacts with a placeholder.
            </p>

            {sortedIframes.map((iframe: any, index: number) => (
                <li key={index} className={styles.listItem}>
                    <a href={iframe.url} target="_blank" rel="noreferrer">
                        <strong>{iframe.url.substring(0, 40)}</strong>
                    </a>
                    ... -{' '}
                    {calculateLabelFromBytes(parseInt(iframe.transferSize, 10))}
                    <details>
                        <summary className={styles.summary}>
                            Show resource breakdown
                        </summary>
                        <div style={{ marginTop: '10px' }} />
                        <BarChart
                            data={generateEmbedChartData(iframe.resourceSizes)}
                        />
                    </details>
                </li>
            ))}

            <p>No comparison information is available for this report.</p>
        </div>
    );
};
