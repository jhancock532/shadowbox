import React from 'react';
import { BarChartItem } from '@/types/types';
import { Bar } from './Bar';
import styles from './BarChart.module.scss';

type PairedBarProps = {
    itemPair: { item: BarChartItem; comparedItem: BarChartItem };
    maxValue: number;
    index: number;
};

export const PairedBar = ({ itemPair, maxValue, index }: PairedBarProps) => {
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
        <div className={styles.pairedBar__container}>
            <div>
                {itemBar}
                {comparedItemBar}
            </div>
            <p className={styles.pairedBar__legend}>{`${itemPair.item.key}`}</p>
        </div>
    );
};
