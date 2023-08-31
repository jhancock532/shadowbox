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
    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <p
                className={
                    comparisonNumber ? styles.baseNumber : styles.accentNumber
                }
            >
                {number}
            </p>
            {comparisonNumber && (
                <p className={styles.accentNumber}>{comparisonNumber}</p>
            )}
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default KeyNumber;
