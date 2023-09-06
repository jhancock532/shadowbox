import React from 'react';
import Link from 'next/link';
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

            <h2>Network requests</h2>

            <ol className={pageDetailsStyles.networkRequestsList}>
                {networkRequests
                    .sort((a: any, b: any) => b.transferSize - a.transferSize)
                    .map((request: any) => {
                        return (
                            <li key={request.url}>
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
