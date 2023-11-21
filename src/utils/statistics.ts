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
    if (bytes > 1000000) {
        return `${Math.floor(bytes / 1000000)} MB`;
    }

    return `${Math.floor(bytes / 1000)} kB`;
};
