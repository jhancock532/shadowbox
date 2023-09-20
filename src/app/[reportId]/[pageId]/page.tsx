import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    loadWebpageMetadata,
    loadWebpageNetworkRequests,
} from '@/utils/loadFileData';
import ExternalLinkIcon from '@/components/Icons/ExternalLinkIcon';
import pageDetailsStyles from './PageDetails.module.scss';

export default function ReportPageDetailsView({ params }: any) {
    const networkRequests = loadWebpageNetworkRequests(
        params.reportId,
        params.pageId,
    );
    const metadata = loadWebpageMetadata(params.reportId, params.pageId);

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
