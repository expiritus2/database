import { apiServer } from 'settings/web-services/api';

export function createCompany(cfg) {
    return apiServer.post('/api/companies/create', cfg);
}

export function updateCompany(cfg) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/companies/${id}`, config);
}

export function getCompanies(cfg) {
    return apiServer.get('/api/companies', { params: cfg });
}
