'use client';

import React from 'react';
import Link from 'next/link';
import styles from './NetworkRequestSummaryChart.module.scss';
import Pattern from '../Pattern';

const mapRequestTypeToBackground = (
    requestType: string,
    colorTheme: string,
) => {
    if (colorTheme === 'primary') {
        switch (requestType) {
            case 'document':
                return 'var(--color--primary-gradient-1)';
            case 'font':
                return 'var(--color--primary-gradient-3)';
            case 'image':
                return 'var(--color--primary-gradient-5)';
            case 'script':
                return 'var(--color--primary-gradient-7)';
            case 'stylesheet':
                return 'var(--color--primary-gradient-8)';
            default:
                return '#000000';
        }
    }
    switch (requestType) {
        case 'document':
            return 'var(--color--secondary-gradient-1)';
        case 'font':
            return 'var(--color--secondary-gradient-3)';
        case 'image':
            return 'var(--color--secondary-gradient-5)';
        case 'script':
            return 'var(--color--secondary-gradient-7)';
        case 'stylesheet':
            return 'var(--color--secondary-gradient-8)';
        default:
            return '#000000';
    }
};

const mapRequestTypeToPattern = (requestType: string) => {
    switch (requestType) {
        case 'document':
            return 'ExRegular';
        case 'font':
            return 'CheckerRegular';
        case 'image':
            return 'DiagonalARegular';
        case 'script':
            return 'DiagonalBLoose';
        case 'stylesheet':
            return 'CheckerDense';
        default:
            return 'ExRegular';
    }
};

const mapRequestTypeToPatternColor = (requestType: string) => {
    switch (requestType) {
        case 'document':
            return '#ddd';
        case 'font':
            return '#ddd';
        case 'image':
            return '#ddd';
        case 'script':
            return '#555';
        case 'stylesheet':
            return '#555';
        default:
            return '#555';
    }
};

// Todo: return as array of objects
const orderNetworkRequestSizeTallies = (networkRequestSizeTallies: any) => {
    const orderedNetworkRequestSizeTallies: any = {};

    Object.keys(networkRequestSizeTallies)
        .sort()
        .forEach((key) => {
            orderedNetworkRequestSizeTallies[key] =
                networkRequestSizeTallies[key];
        });

    return orderedNetworkRequestSizeTallies;
};

const BarSegment: React.FC<any> = ({
    value,
    totalValue,
    color,
    text,
    pattern,
    patternColor,
}) => {
    const [isLabelShown, setIsLabelShown] = React.useState(false);

    const segmentWidth = `${(value / totalValue) * 100}%`;

    return (
        <div
            className={styles.segment}
            style={{
                width: segmentWidth,
                backgroundColor: color,
            }}
            onMouseEnter={() => setIsLabelShown(true)}
            onMouseLeave={() => setIsLabelShown(false)}
        >
            <Pattern
                pattern={pattern}
                color={patternColor}
                className={styles.segment__pattern}
            />
            {isLabelShown ? (
                <div className={styles.segment__label}>
                    <p className={styles.segment__text}>{text}</p>
                </div>
            ) : null}
        </div>
    );
};

const Bar: React.FC<any> = ({
    maxPossibleValue,
    unsortedNetworkRequestTallies,
    colorTheme,
}) => {
    // Find the total size of the webpage resources
    const webpageTotalSize = Object.values(
        unsortedNetworkRequestTallies,
    ).reduce((a: any, b: any) => a + b, 0) as number;

    // Order the network request size tallies in a consistent manner
    const sortedNetworkRequestTallies = orderNetworkRequestSizeTallies(
        unsortedNetworkRequestTallies,
    );

    const barWidth = `${(webpageTotalSize / maxPossibleValue) * 100}%`;
    const barLabel = `${Math.floor(webpageTotalSize / 1000)} kB`;

    return (
        <div className={styles.bar__container}>
            <div
                className={styles.bar}
                style={{
                    width: barWidth,
                }}
            >
                {Object.keys(sortedNetworkRequestTallies).map(
                    (networkRequestSizeTally: any, index: number) => {
                        const segmentText = `${Math.floor(
                            sortedNetworkRequestTallies[
                                networkRequestSizeTally
                            ] / 1000,
                        )} kB of ${networkRequestSizeTally}s`;

                        return (
                            <BarSegment
                                key={index}
                                value={
                                    sortedNetworkRequestTallies[
                                        networkRequestSizeTally
                                    ]
                                }
                                totalValue={webpageTotalSize}
                                color={mapRequestTypeToBackground(
                                    networkRequestSizeTally,
                                    colorTheme,
                                )}
                                text={segmentText}
                                pattern={mapRequestTypeToPattern(
                                    networkRequestSizeTally,
                                )}
                                patternColor={mapRequestTypeToPatternColor(
                                    networkRequestSizeTally,
                                )}
                            />
                        );
                    },
                )}
            </div>
            <p className={styles.bar__label}>{barLabel}</p>
        </div>
    );
};

export const NetworkRequestBar: React.FC<any> = ({
    maxPossibleValue,
    networkRequestData,
}) => {
    const [isUrlShown, setIsUrlShown] = React.useState(false);

    let webpageBar = null;
    let comparedWebpageBar = null;
    let url = 'Error';

    if (networkRequestData.webpage) {
        webpageBar = (
            <Bar
                maxPossibleValue={maxPossibleValue}
                unsortedNetworkRequestTallies={
                    networkRequestData.webpage.networkRequestSizeTallies
                }
                colorTheme={'secondary'}
            />
        );
        url = networkRequestData.webpage.url;
    }

    if (networkRequestData.comparedWebpage) {
        comparedWebpageBar = (
            <Bar
                maxPossibleValue={maxPossibleValue}
                unsortedNetworkRequestTallies={
                    networkRequestData.comparedWebpage.networkRequestSizeTallies
                }
                colorTheme="primary"
            />
        );
        url = networkRequestData.comparedWebpage.url;
    }

    return (
        <Link
            className={styles.pair}
            onMouseEnter={() => setIsUrlShown(true)}
            onMouseLeave={() => setIsUrlShown(false)}
            onFocus={() => setIsUrlShown(true)}
            onBlur={() => setIsUrlShown(false)}
            href={'/'}
        >
            {webpageBar}
            {comparedWebpageBar}
            <p
                className={styles.pair__text}
                style={{
                    opacity: isUrlShown ? '1' : '0',
                    zIndex: isUrlShown ? '2' : '-1',
                }}
            >
                {url}
            </p>
        </Link>
    );
};
