import React from 'react';
import Link from 'next/link';
import ResetCookies from '@/components/ResetCookies';
import { loadListOfReports } from '@/utils/loadFileData';
import homePageStyles from './HomePage.module.scss';
import '@/styles/globals.scss';

export default function Index() {
    const availableReports = loadListOfReports();

    return (
        <main>
            <ResetCookies />
            <h1 className={homePageStyles.title}>Site reports</h1>
            <p className={homePageStyles.subtitle}>
                Select a report from the timestamps below.
            </p>
            <ul className={homePageStyles.reportList}>
                {availableReports.map((report: any) => {
                    return (
                        <li key={report.reportId}>
                            <Link
                                className={homePageStyles.link}
                                href={`/${report.reportId}`}
                            >
                                {new Date(
                                    report.reportDateTime,
                                ).toLocaleDateString('en-GB', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
