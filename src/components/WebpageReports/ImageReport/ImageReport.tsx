import BarChart from '@/components/BarChart';
import { BarChartItem } from '@/types/types';
import { combineListWithCommas } from '../reportUtilities';

const generateImageChartData = (requestData: any) => {
    const chartData: BarChartItem[] = [];

    Object.keys(requestData.images).forEach((key) => {
        const item = requestData.images[key];

        chartData.push({
            key: `.${key}`,
            value: item.size,
            tooltip: `${item.count} ${key} images totalling ${Math.floor(
                item.size / 1000,
            )} kB`,
            label: `${Math.floor(item.size / 1000)} kB`,
        });
    });

    return chartData;
};

export function ImageReport({ requestData, comparedRequestData }: any) {
    const images = requestData.images;
    const imageChartData = generateImageChartData(requestData);

    let comparedImageChartData;
    if (comparedRequestData) {
        comparedImageChartData = generateImageChartData(comparedRequestData);
    }

    const imageStatMessages = [];

    for (const key in images) {
        if (key !== 'webp' && key !== 'svg' && key !== 'ico') {
            if (images[key].count > 0 && images[key].size > 0) {
                imageStatMessages.push(`${images[key].count} ${key}`);
            }
        }
    }

    return (
        <div>
            <h2>Images</h2>
            <p>
                To save data using more effective image compression, consider
                replacing the {combineListWithCommas(imageStatMessages)} images
                with webp.
            </p>
            <BarChart
                data={imageChartData}
                comparisonData={comparedImageChartData}
            />
        </div>
    );
}
