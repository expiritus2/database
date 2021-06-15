import { apiServer } from 'settings/web-services/api';

export function createApplicant(cfg) {
    return apiServer.post('/api/applicants/create', cfg);
}

export function updateApplicant(cfg) {
    const { id, ...config } = cfg;
    console.log('this');
    return apiServer.put(`/api/applicants/${id}`, config);
}

export function getApplicants(cfg) {
    return apiServer.get('/api/applicants', { params: cfg });
}
