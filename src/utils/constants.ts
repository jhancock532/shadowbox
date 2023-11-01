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
    'var(--color--pattern)',
    'var(--color--pattern)',
    'var(--color--pattern)',
    'var(--color--pattern)',
    'var(--color--pattern-inverse)',
    'var(--color--pattern-inverse)',
    'var(--color--pattern-inverse)',
    'var(--color--pattern-inverse)',
];

export const LIGHT_COLORS = {
    '--color--primary': 'var(--color--coral)',
    '--color--text': 'var(--color--grey-200)',
    '--color--text-muted': 'var(--color--grey-400)',
    '--color--background': 'var(--color--white)',
    '--color--border': 'var(--color--grey-700)',
    '--color--link': 'var(--color--coral)',
    '--color--hover': 'var(--color--coral-dark)',
    '--color--underline': 'var(--color--coral)',
    '--color--pattern': 'var(--color--pattern-light)',
    '--color--pattern-inverse': 'var(--color--pattern-dark)',
    '--color--primary-gradient-1': 'var(--color--dark-indigo)',
    '--color--primary-gradient-2': 'var(--color--purple-200)',
    '--color--primary-gradient-3': 'var(--color--purple-300)',
    '--color--primary-gradient-4': 'var(--color--rose-300)',
    '--color--primary-gradient-5': 'var(--color--coral)',
    '--color--primary-gradient-6': 'var(--color--orange-300)',
    '--color--primary-gradient-7': 'var(--color--orange-600)',
    '--color--primary-gradient-8': 'var(--color--yellow-600)',
    '--color--secondary-gradient-1': 'var(--color--black)',
    '--color--secondary-gradient-2': 'var(--color--grey-200)',
    '--color--secondary-gradient-3': 'var(--color--grey-300)',
    '--color--secondary-gradient-4': 'var(--color--grey-400)',
    '--color--secondary-gradient-5': 'var(--color--grey-500)',
    '--color--secondary-gradient-6': 'var(--color--grey-600)',
    '--color--secondary-gradient-7': 'var(--color--grey-700)',
    '--color--secondary-gradient-8': 'var(--color--grey-800)',
};

export const DARK_COLORS = {
    '--color--primary': 'var(--color--coral)',
    '--color--text': 'var(--color--grey-800)',
    '--color--text-muted': 'var(--color--grey-700)',
    '--color--background': 'var(--color--black)',
    '--color--border': 'var(--color--grey-700)',
    '--color--link': 'var(--color--coral)',
    '--color--hover': 'var(--color--yellow-600)',
    '--color--underline': 'var(--color--coral)',
    '--color--pattern': 'var(--color--pattern-dark)',
    '--color--pattern-inverse': 'var(--color--pattern-light)',
    '--color--primary-gradient-1': 'var(--color--yellow-600)',
    '--color--primary-gradient-2': 'var(--color--orange-600)',
    '--color--primary-gradient-3': 'var(--color--orange-300)',
    '--color--primary-gradient-4': 'var(--color--coral)',
    '--color--primary-gradient-5': 'var(--color--rose-300)',
    '--color--primary-gradient-6': 'var(--color--purple-300)',
    '--color--primary-gradient-7': 'var(--color--purple-200)',
    '--color--primary-gradient-8': 'var(--color--dark-indigo)',
    '--color--secondary-gradient-1': 'var(--color--grey-800)',
    '--color--secondary-gradient-2': 'var(--color--grey-700)',
    '--color--secondary-gradient-3': 'var(--color--grey-600)',
    '--color--secondary-gradient-4': 'var(--color--grey-500)',
    '--color--secondary-gradient-5': 'var(--color--grey-400)',
    '--color--secondary-gradient-6': 'var(--color--grey-300)',
    '--color--secondary-gradient-7': 'var(--color--grey-200)',
    '--color--secondary-gradient-8': 'var(--color--black)',
};
