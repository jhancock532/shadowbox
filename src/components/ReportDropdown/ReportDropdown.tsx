import React from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './ReportDropdown.module.scss';

type ReportDropdownProps = {
    title: string;
    options: any[];
    selected: string | null;
    setSelected: (value: string | null) => void;
    isBaseReport?: boolean;
};

const ReportDropdown = ({
    title,
    options,
    selected,
    setSelected,
    isBaseReport,
}: ReportDropdownProps) => {
    const router = useRouter();

    const selectedReportDateTime = options.find(
        (option: any) => option.reportId === selected,
    )?.reportDateTime;

    const selectedReportTimeString = selectedReportDateTime
        ? new Date(selectedReportDateTime).toLocaleTimeString('en-GB', {
              hour: 'numeric',
              minute: 'numeric',
          })
        : '';

    return (
        <div className={styles.dropdown}>
            <p className={styles.title}>{title}</p>

            <select
                className={styles.select}
                value={selected || 'None'}
                onChange={(event) => {
                    if (isBaseReport) {
                        if (event.target.value === 'None') {
                            router.push('/');
                            return;
                        }
                        router.push(`/${event.target.value}`);
                        return;
                    }

                    if (event.target.value === 'None') {
                        setSelected(null);
                        Cookie.remove('compared-report-id');
                        router.refresh();
                    } else {
                        setSelected(event.target.value);
                        Cookie.set('compared-report-id', event.target.value, {
                            expires: 1000,
                        });
                        // Refresh the current page with the new cookie value
                        router.refresh();
                    }
                }}
            >
                {!isBaseReport && (
                    <option value="None" key="none">
                        None
                    </option>
                )}
                {options.map((option: any) => {
                    return (
                        <option key={option.reportId} value={option.reportId}>
                            {new Date(option.reportDateTime).toLocaleDateString(
                                'en-GB',
                                {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                },
                            )}
                        </option>
                    );
                })}
            </select>

            <p className={styles.details}>{selectedReportTimeString}</p>

            {selectedReportTimeString && (
                <div
                    className={`${styles.border} ${
                        isBaseReport
                            ? styles.border__secondary
                            : styles.border__primary
                    }`}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export default ReportDropdown;
