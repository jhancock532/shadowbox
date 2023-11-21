export function combineListWithCommas(listOfStrings: string[]) {
    if (listOfStrings.length === 0) {
        return '';
    }
    if (listOfStrings.length === 1) {
        return listOfStrings[0];
    }
    if (listOfStrings.length === 2) {
        return listOfStrings[0] + ' and ' + listOfStrings[1];
    }

    return (
        listOfStrings.slice(0, -2).join(', ') +
        ' and ' +
        listOfStrings.slice(-1)
    );
}
