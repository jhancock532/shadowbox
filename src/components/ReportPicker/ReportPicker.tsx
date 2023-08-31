'use client';

import React from 'react';
import ReportDropdown from '@/components/ReportDropdown';
import styles from './ReportPicker.module.scss';

type ReportPickerProps = {
    reportList: any[];
    initialBaseReportId: string | null;
    initialComparedReportId: string | null;
};

export default function ReportPicker({
    reportList,
    initialBaseReportId,
    initialComparedReportId,
}: ReportPickerProps) {
    const [baseReportId, setBaseReportId] = React.useState(initialBaseReportId);
    const [comparedReportId, setComparedReportId] = React.useState(
        initialComparedReportId,
    );

    return (
        <div className={styles.container}>
            <div className={styles.dropdownContainer}>
                <ReportDropdown
                    description="Select report"
                    options={reportList}
                    selected={baseReportId}
                    setSelected={setBaseReportId}
                    isBaseReport
                />
                {baseReportId !== null && (
                    <ReportDropdown
                        description="Compare with"
                        options={reportList}
                        selected={comparedReportId}
                        setSelected={setComparedReportId}
                    />
                )}
            </div>
        </div>
    );
}
