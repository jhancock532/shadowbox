import ReportPicker from '@/components/ReportPicker';
import { cookies } from 'next/headers';
import { loadListOfReports } from '@/utils/loadFileData';

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: any;
}) {
    const comparedReportId = cookies().get('compared-report-id')?.value || null;
    const availableReports = loadListOfReports();

    return (
        <div>
            <ReportPicker
                reportList={availableReports}
                initialBaseReportId={params.reportId}
                initialComparedReportId={comparedReportId}
            />
            {children}
        </div>
    );
}
