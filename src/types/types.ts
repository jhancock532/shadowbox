export type BarChartItem = {
    key: string;
    value: number;
    label?: string;
};

export type ValidPattern =
    | 'ExRegular'
    | 'CheckerRegular'
    | 'DiagonalARegular'
    | 'DiagonalBLoose'
    | 'CheckerDense'
    | 'StripeRegular';
