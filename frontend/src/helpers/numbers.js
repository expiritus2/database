export function divide(val1, val2) {
    const result = val1 / val2;

    if (Number.isNaN(result)) return 0;
    if (result === Infinity) return 1;

    return result;
}

export function calculatePercentageRatio(val1, val2, fractionDigits = 2) {
    return parseFloat((divide(val1, val2) * 100).toFixed(fractionDigits));
}
