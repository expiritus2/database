import { apiServer } from 'settings/web-services/api';

export const generateData = (cfg) => apiServer.post('/api/fake/generate-data', cfg);
