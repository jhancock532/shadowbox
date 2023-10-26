import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import {
    findComparedReportPageId,
    loadWebpageMetadata,
    loadWebpageNetworkRequests,
} from '@/utils/loadFileData';
import { BarChartItem } from '@/types/types';
import ExternalLinkIcon from '@/components/Icons/ExternalLinkIcon';
import BarChart from '@/components/BarChart';
import pageDetailsStyles from './PageDetails.module.scss';

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

function combineListWithCommas(listOfStrings: string[]) {
    if (listOfStrings.length === 0) {
        return '';
    }
    if (listOfStrings.length === 1) {
        return listOfStrings[0];
    }
    if (listOfStrings.length === 2) {
        return listOfStrings[0] + ' and ' + listOfStrings[1];
    }

    return (
        listOfStrings.slice(0, -2).join(', ') +
        ' and ' +
        listOfStrings.slice(-1)
    );
}

function WebpageImageReport({ requestData, comparedRequestData }: any) {
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
        <>
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
        </>
    );
}

export default function ReportPageDetailsView({ params }: any) {
    // Todo: remove when favicons are supported
    if (params.reportId === 'favicons') {
        return null;
    }

    const requestData = loadWebpageNetworkRequests(
        params.reportId,
        params.pageId,
    );

    const metadata = loadWebpageMetadata(params.reportId, params.pageId);

    const comparedReportId = cookies().get('compared-report-id')?.value || null;
    const comparedPageId = findComparedReportPageId(
        comparedReportId,
        metadata.url,
    );

    let comparedRequestData;

    if (comparedReportId && comparedPageId) {
        comparedRequestData = loadWebpageNetworkRequests(
            comparedReportId,
            params.pageId,
        );
    }

    return (
        <div>
            <h1 className={pageDetailsStyles.title}>
                Page details for{' '}
                <a
                    className={pageDetailsStyles.title__link}
                    href={metadata.url}
                >
                    {metadata.url}{' '}
                    <ExternalLinkIcon
                        className={pageDetailsStyles.title__icon}
                    />
                </a>
            </h1>

            <WebpageImageReport
                requestData={requestData}
                comparedRequestData={comparedRequestData}
            />

            {metadata.youtubeEmbeds && metadata.youtubeEmbeds.length > 0 && (
                <>
                    <h2>Sustainability</h2>
                    <p>
                        <strong>{metadata.youtubeEmbeds.length}</strong> youtube
                        embed
                        {metadata.youtubeEmbeds.length > 1
                            ? 's were'
                            : ' was'}{' '}
                        found on this page. Consider replacing these with lazy
                        loaded YouTube videos.
                    </p>
                    <div className={pageDetailsStyles.youtubeEmbedList}>
                        {metadata.youtubeEmbeds.map(
                            (embed: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Image
                                            width="266"
                                            height="150"
                                            src={embed.thumbnail}
                                            alt={embed.title}
                                        />
                                        <p>{embed.title}</p>
                                    </div>
                                );
                            },
                        )}
                    </div>
                </>
            )}

            <h2>Network requests</h2>

            <ol className={pageDetailsStyles.networkRequestsList}>
                {requestData.networkRequests
                    .sort((a: any, b: any) => b.transferSize - a.transferSize)
                    .map((request: any, index: number) => {
                        return (
                            <li key={index}>
                                <Link
                                    className={pageDetailsStyles.link}
                                    href={request.url}
                                >
                                    {request.url} -{' '}
                                    <strong>
                                        {Math.floor(
                                            request.transferSize / 1000,
                                        )}{' '}
                                        kB
                                    </strong>
                                </Link>
                            </li>
                        );
                    })}
            </ol>
        </div>
    );
}
