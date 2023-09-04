import React from 'react';
import styles from './KeyNumber.module.scss';

type KeyNumberProps = {
    number: number;
    comparisonNumber?: number;
    title: string;
    description?: string;
};

const KeyNumber = ({
    number,
    comparisonNumber,
    title,
    description,
}: KeyNumberProps) => {
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
                </p>
            )}
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default KeyNumber;
