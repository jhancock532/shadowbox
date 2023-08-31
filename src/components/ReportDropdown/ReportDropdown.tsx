import React from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './ReportDropdown.module.scss';

type ReportDropdownProps = {
    description: string;
    options: any[];
    selected: string | null;
    setSelected: (value: string | null) => void;
    isBaseReport?: boolean;
};

const ReportDropdown = ({
    description,
    options,
    selected,
    setSelected,
    isBaseReport,
}: ReportDropdownProps) => {
    const router = useRouter();

    return (
        <div className={styles.dropdown}>
            <p className={styles.description}>{description}</p>
            <div>
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
                        } else {
                            setSelected(event.target.value);
                            Cookie.set(
                                'compared-report-id',
                                event.target.value,
                                {
                                    expires: 1000,
                                },
                            );
                        }
                    }}
                >
                    <option value="None" key="none">
                        None
                    </option>
                    {options.map((option: any) => {
                        return (
                            <option
                                key={option.reportId}
                                value={option.reportId}
                            >
                                {new Date(
                                    option.reportDateTime,
                                ).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric',
                                })}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default ReportDropdown;
