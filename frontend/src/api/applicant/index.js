import { apiServer } from 'settings/web-services/api';

export function createApplicant(cfg) {
    return apiServer.post('/api/applicants/create', cfg);
}

export function uploadFiles(cfg) {
    return apiServer.post('/api/files/upload', cfg);
}
