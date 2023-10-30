import BarChart from '@/components/BarChart';
import { BarChartItem } from '@/types/types';
import { combineListWithCommas } from '../reportUtilities';

const generateFontChartData = (requestData: any) => {
    const chartData: BarChartItem[] = [];

    Object.keys(requestData.fonts).forEach((key) => {
        const item = requestData.fonts[key];

        chartData.push({
            key: `.${key}`,
            value: item.size,
            tooltip: `${item.count} ${key} fonts totalling ${Math.floor(
                item.size / 1000,
            )} kB`,
            label: `${Math.floor(item.size / 1000)} kB`,
        });
    });

    return chartData;
};

export function FontReport({ requestData, comparedRequestData }: any) {
    const fonts = requestData.fonts;
    const fontChartData = generateFontChartData(requestData);

    let comparedFontChartData;
    if (comparedRequestData) {
        comparedFontChartData = generateFontChartData(comparedRequestData);
    }

    const fontStatMessages = [];

    for (const key in fonts) {
        if (key !== 'woff2') {
            if (fonts[key].count > 0 && fonts[key].size > 0) {
                fontStatMessages.push(`${fonts[key].count} ${key}`);
            }
        }
    }

    const fontRequests = requestData.networkRequests.filter(
        (request: any) => request.resourceType === 'font',
    );

    return (
        <div>
            <h2>Fonts</h2>

            {fontStatMessages.length > 0 && (
                <>
                    <p>
                        To save data using more effective font compression,
                        consider replacing the{' '}
                        {combineListWithCommas(fontStatMessages)} font files
                        loaded by this page with the WOFF 2.0 file type.
                    </p>
                    <BarChart
                        data={fontChartData}
                        comparisonData={comparedFontChartData}
                    />
                </>
            )}

            {fontRequests.length > 1 && (
                <p>
                    <br></br>
                    This webpage loads in {fontRequests.length} separate font
                    files. Consider loading in fewer font files or using a
                    variable font instead.
                </p>
            )}

            <details>
                <summary>View all font requests</summary>
                <ol>
                    {fontRequests.map((request: any, index: number) => {
                        return (
                            <li key={index}>
                                <a className="link" href={request.url}>
                                    {request.url} -{' '}
                                    <strong>
                                        {Math.floor(
                                            request.transferSize / 1000,
                                        )}{' '}
                                        kB
                                    </strong>
                                </a>
                            </li>
                        );
                    })}
                </ol>
            </details>
        </div>
    );
}
