import React from 'react';
import styles from '../ReportStyles.module.scss';

type FontReportProps = {
    requestSizes: any;
    comparedRequestSizes: any;
};

export function FontReport({
    requestSizes,
    comparedRequestSizes,
}: FontReportProps) {
    const fontList = Object.keys(requestSizes).filter((url: string) => {
        return (
            url.includes('.woff2') ||
            url.includes('.woff') ||
            url.includes('.ttf')
        );
    });

    const numberOfFontsNotUsingWoff2 = fontList.filter((url: string) => {
        return !url.includes('.woff2');
    }).length;

    let comparedFontList = [];

    // if (comparedNetworkRequestSummary) {
    //     comparedChartData = generateTalliedImageChartData(
    //         tallyAllFonts(
    //             comparedNetworkRequestSummary.websiteNetworkRequestSummary,
    //         ),
    //     );
    // }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Font overview</h2>
            <p>
                While crawling the site, {fontList.length} unique font files
                were found.
                {numberOfFontsNotUsingWoff2 > 0
                    ? ` ${numberOfFontsNotUsingWoff2} of these font files
                were not using the .woff2 file format for optimal compression.`
                    : ' All font files where using .woff2 for optimal compression.'}
            </p>
            <details>
                <summary>
                    View all font assets downloaded while crawling
                </summary>
                <ul>
                    {fontList.map((url: string, index: number) => {
                        return <li key={index}>{url}</li>;
                    })}
                </ul>
            </details>
        </div>
    );
}
