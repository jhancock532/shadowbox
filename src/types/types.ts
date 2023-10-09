export type BarChartItem = {
    key: string;
    value: number;
    tooltip?: string;
    label?: string;
};

export type ValidPattern =
    | 'ExRegular'
    | 'CheckerRegular'
    | 'DiagonalARegular'
    | 'DiagonalBLoose'
    | 'CheckerDense'
    | 'StripeRegular';
