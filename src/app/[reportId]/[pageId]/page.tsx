import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    loadWebpageMetadata,
    loadWebpageNetworkRequests,
} from '@/utils/loadFileData';
import { BarChartItem } from '@/types/types';
import ExternalLinkIcon from '@/components/Icons/ExternalLinkIcon';
import BarChart from '@/components/BarChart';
import pageDetailsStyles from './PageDetails.module.scss';

const tallyImagesByFileExtension = (networkRequests: any) => {
    const imageExtensions = [
        '.image',
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.svg',
        '.webp',
    ];

    type ImageTypeTally = {
        extension: string;
        totalSize: number;
        count: number;
    };

    const talliedImageTypes: ImageTypeTally[] = [];

    networkRequests.forEach((request: any) => {
        for (let i = 0; i < imageExtensions.length; i += 1) {
            const extension = imageExtensions[i];

            if (request.url.includes(extension)) {
                if (
                    !talliedImageTypes.find(
                        (item) => item.extension === extension,
                    )
                ) {
                    talliedImageTypes.push({
                        extension: extension,
                        count: 1,
                        totalSize: request.transferSize,
                    });
                } else {
                    const index = talliedImageTypes.findIndex(
                        (item) => item.extension === extension,
                    );
                    talliedImageTypes[index].count += 1;
                    talliedImageTypes[index].totalSize += request.transferSize;
                }
            }
        }
    });

    const chartData: BarChartItem[] = [];

    talliedImageTypes.forEach((item) => {
        chartData.push({
            key: item.extension,
            value: item.totalSize,
            label: `${item.count} ${
                item.extension
            } images totalling ${Math.floor(item.totalSize / 1000)} kB`,
        });
    });

    return chartData;
};

export default function ReportPageDetailsView({ params }: any) {
    const networkRequests = loadWebpageNetworkRequests(
        params.reportId,
        params.pageId,
    );
    const metadata = loadWebpageMetadata(params.reportId, params.pageId);
    const imageTally = tallyImagesByFileExtension(networkRequests);

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

            <h2>Images</h2>

            {!Object.keys(imageTally).includes('webp') ||
            (Object.keys(imageTally).includes('webp') &&
                Object.keys(imageTally).length > 1) ? (
                <p>
                    Some images on this page are not in the{' '}
                    <strong>WebP</strong> format. Consider converting these to
                    WebP to reduce page weight.
                </p>
            ) : (
                <p>All images on this page are in the WebP format.</p>
            )}

            <BarChart data={imageTally} />

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
                {networkRequests
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
