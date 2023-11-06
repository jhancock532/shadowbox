import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';

import {
    findComparedReportPageId,
    loadWebpageMetadata,
    loadWebpageNetworkRequests,
} from '@/utils/loadFileData';
import { ExternalLinkIcon } from '@/components/Icons';
import WebpageReports from '@/components/WebpageReports';
import pageDetailsStyles from './PageDetails.module.scss';

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
            comparedPageId,
        );
    }

    return (
        <div>
            <Link
                className={pageDetailsStyles.backLink}
                href={`/${params.reportId}`}
            >
                Back to website overview
            </Link>

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

            <WebpageReports
                {...{ requestData, comparedRequestData, metadata }}
            />

            <h2>Network requests</h2>

            <details>
                <summary>View all network requests</summary>

                <ol className={pageDetailsStyles.networkRequestsList}>
                    {requestData.networkRequests
                        .sort(
                            (a: any, b: any) => b.transferSize - a.transferSize,
                        )
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
            </details>
        </div>
    );
}
