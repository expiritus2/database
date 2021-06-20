import { apiServer } from 'settings/web-services/api';

export function createApplicant(cfg) {
    return apiServer.post('/api/applicants/create', cfg);
}

export function updateApplicant(cfg) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/applicants/${id}`, config);
}

export function getApplicants(cfg) {
    return apiServer.get('/api/applicants', { params: cfg });
}

export function deleteApplicant(cfg) {
    return apiServer.delete(`/api/applicants/${cfg.id}`);
}
