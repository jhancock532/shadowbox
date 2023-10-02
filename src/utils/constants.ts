export const FILTER_OPTIONS = [
    'document',
    'script',
    'stylesheet',
    'image',
    'font',
    'xhr',
];

export type NetworkRequest = (typeof FILTER_OPTIONS)[number];

export const BAR_COLORS: { [key: string]: string } = {
    document: '#eb4747',
    script: '#ebb447',
    stylesheet: '#b4eb47',
    image: '#47b4eb',
    font: '#4747eb',
    xhr: '#eb47b4',
    json: '#8884d8',
};

export const PRIMARY_GRADIENT = [
    'var(--color--primary-gradient-1)',
    'var(--color--primary-gradient-2)',
    'var(--color--primary-gradient-3)',
    'var(--color--primary-gradient-4)',
    'var(--color--primary-gradient-5)',
    'var(--color--primary-gradient-6)',
    'var(--color--primary-gradient-7)',
    'var(--color--primary-gradient-8)',
];

export const SECONDARY_GRADIENT = [
    'var(--color--secondary-gradient-1)',
    'var(--color--secondary-gradient-2)',
    'var(--color--secondary-gradient-3)',
    'var(--color--secondary-gradient-4)',
    'var(--color--secondary-gradient-5)',
    'var(--color--secondary-gradient-6)',
    'var(--color--secondary-gradient-7)',
    'var(--color--secondary-gradient-8)',
];

export const PATTERNS = [
    'ExRegular',
    'CheckerRegular',
    'DiagonalARegular',
    'DiagonalBLoose',
    'CheckerDense',
    'ExRegular',
    'CheckerRegular',
    'DiagonalARegular',
];

export const PATTERN_COLORS = [
    '#ddd',
    '#ddd',
    '#ddd',
    '#ddd',
    '#555',
    '#555',
    '#555',
    '#555',
];
