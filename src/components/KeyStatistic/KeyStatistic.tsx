import React from 'react';
import styles from './KeyStatistic.module.scss';

type KeyStatisticProps = {
    number: number;
    comparisonNumber?: number;
    title: string;
    description?: string;
    units?: string;
};

const KeyStatistic = ({
    number,
    comparisonNumber,
    title,
    description,
    units,
}: KeyStatisticProps) => {
    let widthPercentage = 0;

    if (comparisonNumber) {
        if (comparisonNumber > number) {
            widthPercentage = (number / comparisonNumber) * 100;
        } else {
            widthPercentage = (comparisonNumber / number) * 100;
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
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default KeyStatistic;
