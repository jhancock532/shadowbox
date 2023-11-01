import React from 'react';
import styles from '../ReportStyles.module.scss';

// Todo: make as utility function and add tests
const extractFontsFromRequestSizes = (requestSizes: any) => {
    const fonts = [] as any;

    Object.keys(requestSizes).forEach((key) => {
        if (
            key.includes('.woff2') ||
            key.includes('.woff') ||
            key.includes('.ttf') ||
            key.includes('.otf') ||
            key.includes('.eot')
        ) {
            fonts.push(key);
        }
    });

    return fonts;
};

type FontOverviewProps = {
    requestSizes: any;
    comparedRequestSizes: any;
};

export function FontOverview({
    requestSizes,
    comparedRequestSizes,
}: FontOverviewProps) {
    const fontList = extractFontsFromRequestSizes(requestSizes);

    const numberOfFontsNotUsingWoff2 = fontList.filter((url: string) => {
        return !url.includes('.woff2');
    }).length;

    let comparedFontList;
    let comparedNumberOfFontsNotUsingWoff2;

    if (comparedRequestSizes) {
        comparedFontList = extractFontsFromRequestSizes(comparedRequestSizes);
        comparedNumberOfFontsNotUsingWoff2 = comparedFontList.filter(
            (url: string) => {
                return !url.includes('.woff2');
            },
        ).length;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Font overview</h2>
            <p>
                While crawling the site, <strong>{fontList.length}</strong>{' '}
                unique font files were found.
                {numberOfFontsNotUsingWoff2 > 0
                    ? ` ${numberOfFontsNotUsingWoff2} of these font files
                were not using the .woff2 file format for optimal compression.`
                    : ' All font files where using .woff2 for optimal compression.'}
                {fontList.length > 2 &&
                    'Try using less font files, or variable fonts.'}
            </p>
            <details className={styles.details}>
                <summary>
                    View all font assets downloaded while crawling
                </summary>
                <ul className={styles.details__list}>
                    {fontList.map((url: string, index: number) => {
                        return <li key={index}>{url}</li>;
                    })}
                </ul>
            </details>
            {comparedFontList && (
                <>
                    <p>
                        In comparison,{' '}
                        <strong>{comparedFontList.length}</strong> unique font
                        files were found in the compared report.
                        {comparedNumberOfFontsNotUsingWoff2 > 0
                            ? ` ${comparedNumberOfFontsNotUsingWoff2} of these font files
                were not using the .woff2 file format for optimal compression.`
                            : ' All compared font files where using .woff2 for optimal compression.'}
                    </p>
                    <details className={styles.details}>
                        <summary>
                            View all font assets downloaded while crawling the
                            compared report
                        </summary>
                        <ul className={styles.details__list}>
                            {comparedFontList.map(
                                (url: string, index: number) => {
                                    return <li key={index}>{url}</li>;
                                },
                            )}
                        </ul>
                    </details>
                </>
            )}
        </div>
    );
}
