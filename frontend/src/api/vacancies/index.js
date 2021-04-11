import { apiServer } from 'settings/web-services/api';

export function createVacancy(cfg) {
    return apiServer.post('/api/vacancies/create', cfg);
}

export function updateVacancy(cfg) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vacancies/${id}`, config);
}

export function getVacancies(cfg) {
    return apiServer.get('/api/vacancies', { params: cfg });
}
