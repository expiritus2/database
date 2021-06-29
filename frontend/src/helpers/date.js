import moment from 'moment';

export const getDate = (date, format = 'D MMM, YYYY') => moment(date).format(format);
