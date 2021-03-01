export const formatNumber = (value, params = {}, locale = 'en-US') => new Intl.NumberFormat(locale, params).format(value);

export function titleCase(str) {
    const wordsArray = str.toLowerCase().split(/\s+/);
    const upperCased = wordsArray.map((word) => word.charAt(0).toUpperCase() + word.substr(1));
    return upperCased.join(' ');
}
