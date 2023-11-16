import React from 'react';
import styles from '../OverviewReportStyles.module.scss';

type IframeOverviewProps = {
    iframes: any;
    comparedIframes: any;
};

export function IframeOverview({
    iframes,
    comparedIframes,
}: IframeOverviewProps) {
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
        </div>
    );
}
