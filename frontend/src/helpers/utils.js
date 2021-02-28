export const formatNumber = (value, params = {}, locale = 'en-US') => new Intl.NumberFormat(locale, params).format(value);
