import { apiServer } from 'settings/web-services/api';

export function getResources() {
    return apiServer.get('/api/resources');
}
