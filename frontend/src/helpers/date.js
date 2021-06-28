import moment from 'moment';

export const getDate = (date, format = 'Do/MMM/YYYY') => moment(date).format(format);
