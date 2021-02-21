import axios from 'axios';

const getDevelopmentApiLink = () => (process.env.REACT_APP_API_ENDPOINT || 'https://localhost:3000');
const getProductionApiLink = () => process.env.REACT_APP_API_ENDPOINT;

export const apiServer = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? getProductionApiLink() : getDevelopmentApiLink(),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const setHeaders = ({ accessToken }) => {
    apiServer.defaults.headers.Authorization = `Bearer ${accessToken}`;
};

export const clearHeaders = () => {
    delete apiServer.defaults.headers.Authorization;
};
