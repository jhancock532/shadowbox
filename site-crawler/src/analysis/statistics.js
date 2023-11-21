/**
 * Calculates the average value of an array of numbers.
 * @param {number[]} array - The array of numbers
 * @returns {number} The average value of the array.
 */
export const calculateAverageFromArray = (array) => {
    if (array.length === 0) {
        return null;
    }

    const isNumber = (value) => typeof value === 'number';
    if (!array.every(isNumber)) {
        throw new Error('Input array must contain only numbers');
    }

    let sum = 0;
    for (const weight of array) {
        sum += weight;
    }

    const averageFromArray = sum / array.length;

    return averageFromArray;
};

/**
 * Calculates the median value of an array of numbers.
 * @param {number[]} array - The array of numbers
 * @returns {number} The median value of the array.
 */
export const calculateMedianFromArray = (array) => {
    if (array.length === 0) {
        return null;
    }

    const isNumber = (value) => typeof value === 'number';
    if (!array.every(isNumber)) {
        throw new Error('Input array must contain only numbers');
    }

    const median = array.sort((a, b) => {
        return b - a;
    })[Math.floor(array.length / 2)];

    return median;
};
