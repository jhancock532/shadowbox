import React from 'react';
import BarChart from '@/components/BarChart';
import { BarChartItem } from '@/types/types';
import styles from '../ReportStyles.module.scss';

type ImageOverviewProps = {
    networkRequestSummary: any;
    comparedNetworkRequestSummary: any;
};

const calculateTooltip = (item: any, fileType: string) => {
    return `${item.count} ${fileType} images totalling ${Math.floor(
        item.size / 1000,
    )} kB`;
};

const calculateLabel = (item: any) => {
    if (item.size > 1000000) {
        return `${Math.floor(item.size / 1000000)} MB`;
    }

    return `${Math.floor(item.size / 1000)} kB`;
};

const generateTalliedImageChartData = (talliedImages: any) => {
    const chartData: BarChartItem[] = [];

    Object.keys(talliedImages).forEach((key) => {
        const item = talliedImages[key];

        chartData.push({
            key: `.${key}`,
            value: item.size,
            tooltip: calculateTooltip(item, key),
            label: calculateLabel(item),
        });
    });

    return chartData;
};

const tallyAllImages = (networkRequestSummary: any) => {
    const imageTallies = [] as any;

    for (let i = 0; i < networkRequestSummary.length; i += 1) {
        Object.keys(networkRequestSummary[i].imageFileTallies).forEach(
            (key) => {
                if (imageTallies[key]) {
                    imageTallies[key].count +=
                        networkRequestSummary[i].imageFileTallies[key].count;
                    imageTallies[key].size +=
                        networkRequestSummary[i].imageFileTallies[key].size;
                } else {
                    imageTallies[key] = {
                        count: networkRequestSummary[i].imageFileTallies[key]
                            .count,
                        size: networkRequestSummary[i].imageFileTallies[key]
                            .size,
                    };
                }
            },
        );
    }

    return imageTallies;
};

const tallyTotalNumberOfAllImageTypes = (talliedImages: any) => {
    let totalNumberOfAllImageTypes = 0;

    Object.keys(talliedImages).forEach((key) => {
        totalNumberOfAllImageTypes += talliedImages[key].count;
    });

    return totalNumberOfAllImageTypes;
};

export function ImageOverview({
    networkRequestSummary,
    comparedNetworkRequestSummary,
}: ImageOverviewProps) {
    const talliedImages = tallyAllImages(
        networkRequestSummary.websiteNetworkRequestSummary,
    );
    const totalNumberOfAllImageTypes =
        tallyTotalNumberOfAllImageTypes(talliedImages);
    const chartData = generateTalliedImageChartData(talliedImages);

    let comparedChartData;

    if (comparedNetworkRequestSummary) {
        comparedChartData = generateTalliedImageChartData(
            tallyAllImages(
                comparedNetworkRequestSummary.websiteNetworkRequestSummary,
            ),
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Image overview</h2>
            <p>
                Of the {totalNumberOfAllImageTypes} images loaded across all
                pages of the site, {talliedImages.webp.count} where found using
                the .webp file format. The more images that use .webp, the less
                data that needs transferred while loading a webpage.
            </p>
            <BarChart data={chartData} comparisonData={comparedChartData} />
        </div>
    );
}
