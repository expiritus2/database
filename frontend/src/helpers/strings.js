/**
 *
 * @param str
 * @returns {boolean} - return true if string is in float format
 */
export function isFloatStr(str) {
    const floatRegex = /^-?\d+(?:[.]\d*?)?$/;
    if (!floatRegex.test(str)) return false;

    return !Number.isNaN(parseFloat(str));
}
