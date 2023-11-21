'use client';

import React from 'react';
import {
    PRIMARY_GRADIENT,
    SECONDARY_GRADIENT,
    PATTERNS,
    PATTERN_COLORS,
} from '@/utils/constants';
import { ValidPattern } from '@/types/types';
import Pattern from '../Pattern';
import styles from './BarChart.module.scss';

export const Bar: React.FC<any> = ({
    value,
    totalValue,
    tooltip,
    label,
    showPattern = true,
    isComparedItem = false,
    index = 0,
}) => {
    const [isTooltipShown, setIsTooltipShown] = React.useState(false);
    const barWidth = `${(value / totalValue) * 100}%`;
    const moduloIndex = index % 8;

    return (
        <div className={styles.bar__container}>
            <div
                className={styles.bar}
                style={{
                    width: barWidth,
                    backgroundColor: isComparedItem
                        ? PRIMARY_GRADIENT[moduloIndex]
                        : SECONDARY_GRADIENT[moduloIndex],
                }}
                onMouseEnter={() => setIsTooltipShown(true)}
                onMouseLeave={() => setIsTooltipShown(false)}
            >
                {showPattern && (
                    <Pattern
                        pattern={PATTERNS[moduloIndex] as ValidPattern}
                        color={PATTERN_COLORS[moduloIndex]}
                        className={styles.bar__pattern}
                    />
                )}

                {tooltip && isTooltipShown ? (
                    <div className={styles.bar__tooltip}>
                        <p className={styles.bar__tooltipText}>{tooltip}</p>
                    </div>
                ) : null}
            </div>
            {label && (
                <div className={styles.bar__label}>
                    <p className={styles.bar__labelText}>{label}</p>
                </div>
            )}
        </div>
    );
};
