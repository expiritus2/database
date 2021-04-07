import { apiServer } from 'settings/web-services/api';

export function uploadFiles(cfg) {
    return apiServer.post('/api/files/upload', cfg);
}
