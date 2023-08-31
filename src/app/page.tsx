import Link from 'next/link';
import { loadListOfReports } from '@/utils/loadFileData';
import '@/styles/globals.scss';

export default function Index() {
    const availableReports = loadListOfReports();

    return (
        <main>
            <h1>Site reports</h1>
            <ul>
                {availableReports.map((report: any) => {
                    return (
                        <li key={report.reportId}>
                            <Link href={`/${report.reportId}`}>
                                {new Date(report.reportDateTime).toUTCString()}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
