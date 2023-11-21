import React from 'react';
import styles from './KeyStatistic.module.scss';

type KeyStatisticProps = {
    number: number;
    comparisonNumber?: number;
    title: string;
    description?: string;
    units?: string;
    showPercentageChange?: boolean;
};

const KeyStatistic = ({
    number,
    comparisonNumber,
    title,
    description,
    units,
    showPercentageChange,
}: KeyStatisticProps) => {
    let widthPercentage = 0;
    let percentageChange;

    if (Number.isNaN(comparisonNumber)) {
        comparisonNumber = undefined;
    }

    if (comparisonNumber) {
        if (comparisonNumber > number) {
            widthPercentage = (number / comparisonNumber) * 100;
            percentageChange = `increased by ${Math.abs(
                Math.round(
                    ((number - comparisonNumber) / comparisonNumber) * 100,
                ),
            )}%`;
        } else {
            widthPercentage = (comparisonNumber / number) * 100;
            percentageChange = `decreased by ${Math.abs(
                Math.round(((comparisonNumber - number) / number) * 100),
            )}%`;
        }
        if (comparisonNumber === number) {
            percentageChange = '';
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <p
                className={styles.baseNumber}
                style={{
                    width: comparisonNumber
                        ? comparisonNumber > number
                            ? `${widthPercentage}%`
                            : '100%'
                        : '100%',
                }}
            >
                {number}
                {units || ''}
            </p>
            {comparisonNumber && (
                <p
                    className={styles.accentNumber}
                    style={{
                        width:
                            comparisonNumber < number
                                ? `${widthPercentage}%`
                                : '100%',
                    }}
                >
                    {comparisonNumber}
                    {units || ''}
                </p>
            )}
            {showPercentageChange && percentageChange && (
                <p className={styles.percentageChange}>{percentageChange}</p>
            )}
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );
};

export default KeyStatistic;
