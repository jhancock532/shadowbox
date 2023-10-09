'use client';

import React from 'react';

import { BarChartItem, ValidPattern } from '@/types/types';
import {
    PRIMARY_GRADIENT,
    SECONDARY_GRADIENT,
    PATTERNS,
    PATTERN_COLORS,
} from '@/utils/constants';
import styles from './BarChart.module.scss';
import Pattern from '../Pattern';

function calculateMaxBarChartValue(
    data: BarChartItem[],
    comparisonData?: BarChartItem[],
) {
    let maxValue = 0;

    for (let i = 0; i < data.length; i += 1) {
        const value = data[i].value;
        if (typeof value === 'number' && value > maxValue) {
            maxValue = value;
        }
    }

    if (comparisonData) {
        for (let i = 0; i < comparisonData.length; i += 1) {
            const value = comparisonData[i]?.value;
            if (typeof value === 'number' && value > maxValue) {
                maxValue = value;
            }
        }
    }

    return maxValue;
}

/**
 * Combines and sorts the data highest to lowest
 * @param data
 * @param comparedData
 * @returns
 */
const sortBarChartData = (
    data: BarChartItem[],
    comparedData?: BarChartItem[],
) => {
    // Pair the data of the two sets together
    const pairedChartData = data.map((dataItem: any) => {
        if (!comparedData) {
            return {
                item: dataItem,
                comparedItem: null,
            };
        }

        const comparedItem = comparedData.find((comparedItem: BarChartItem) => {
            return comparedItem.key === dataItem.key;
        });

        return {
            item: dataItem,
            comparedItem,
        };
    });

    // Check if there's an item in the compared data that doesn't have a match in the original data, add it to final result
    if (comparedData) {
        const unmatchedComparisonData = comparedData.filter(
            (comparedItem: any) => {
                return !pairedChartData.find((pairedItem: any) => {
                    return pairedItem.item.key === comparedItem.key;
                });
            },
        );

        const formattedUnmatchedComparisonData = unmatchedComparisonData.map(
            (comparedItem: any) => {
                return {
                    item: null,
                    comparedItem,
                };
            },
        );

        pairedChartData.push(...formattedUnmatchedComparisonData);
    }

    const sortedWebpageData = pairedChartData.sort((a: any, b: any) => {
        let comparisonValueA = 0;
        let comparisonValueB = 0;

        if (a.item) {
            comparisonValueA = a.item.value;
        }

        if (a.comparedItem) {
            comparisonValueA = Math.max(a.comparedItem.value, comparisonValueA);
        }

        if (b.item) {
            comparisonValueB = b.item.value;
        }

        if (b.comparedItem) {
            comparisonValueB = Math.max(b.comparedItem.value, comparisonValueB);
        }

        return comparisonValueB - comparisonValueA;
    });

    return sortedWebpageData;
};

const Bar: React.FC<any> = ({
    value,
    totalValue,
    tooltip,
    label,
    isComparedItem = false,
    index = 0,
}) => {
    const [isTooltipShown, setIsTooltipShown] = React.useState(false);

    const barWidth = `${(value / totalValue) * 100}%`;

    const moduloIndex = index % 8;

    return (
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
            <Pattern
                pattern={PATTERNS[moduloIndex] as ValidPattern}
                color={PATTERN_COLORS[moduloIndex]}
                className={styles.bar__pattern}
            />
            {label && (
                <div className={styles.bar__label}>
                    <p className={styles.bar__labelText}>{label}</p>
                </div>
            )}
            {isTooltipShown ? (
                <div className={styles.bar__tooltip}>
                    <p className={styles.bar__tooltipText}>{tooltip}</p>
                </div>
            ) : null}
        </div>
    );
};

type PairedBarProps = {
    itemPair: { item: BarChartItem; comparedItem: BarChartItem };
    maxValue: number;
    index: number;
};

const PairedBar = ({ itemPair, maxValue, index }: PairedBarProps) => {
    let itemBar = null;
    let comparedItemBar = null;

    if (itemPair.item) {
        itemBar = (
            <Bar
                totalValue={maxValue}
                value={itemPair.item.value}
                tooltip={itemPair.item.tooltip}
                label={itemPair.item.label}
                isComparedItem={false}
                index={index}
            />
        );
    }

    if (itemPair.comparedItem) {
        comparedItemBar = (
            <Bar
                totalValue={maxValue}
                value={itemPair.comparedItem.value}
                tooltip={itemPair.comparedItem.tooltip}
                label={itemPair.comparedItem.label}
                isComparedItem
                index={index}
            />
        );
    }
    return (
        <div className={styles.bar__container}>
            <div>
                {itemBar}
                {comparedItemBar}
            </div>
            <p className={styles.bar__legend}>{`${itemPair.item.key}`}</p>
        </div>
    );
};

type BarChartProps = {
    title?: string;
    data: BarChartItem[];
    comparisonData?: BarChartItem[];
};

export default function BarChart({
    title,
    data,
    comparisonData,
}: BarChartProps) {
    const maxValue = calculateMaxBarChartValue(data, comparisonData);
    const sortedBarChartItems = sortBarChartData(data, comparisonData);

    return (
        <div className={styles.container}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {sortedBarChartItems.map((itemPair: any, index: number) => {
                return (
                    <PairedBar
                        key={index}
                        maxValue={maxValue}
                        itemPair={itemPair}
                        index={index}
                    />
                );
            })}
        </div>
    );
}
