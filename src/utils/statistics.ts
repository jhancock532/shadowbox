export const calculateLabelOnSize = (item: any) => {
    if (item.size > 1000000) {
        return `${Math.floor(item.size / 1000000)} MB`;
    }

    return `${Math.floor(item.size / 1000)} kB`;
};

/**
 * Convert bytes to human-readable format (KB, MB, GB).
 * @param {number} bytes - The size in bytes.
 * @returns {string} - Formatted string.
 */
export const calculateLabelFromBytes = (bytes: number) => {
    const sizes = ['KB', 'MB', 'GB'];

    if (bytes === 0) return '0 KB';

    const i = Math.floor(Math.log2(bytes) / 10);
    // eslint-disable-next-line no-bitwise
    const formattedSize = (bytes / (1 << (i * 10))).toFixed(2);

    return `${formattedSize} ${sizes[i - 1]}`;
};
