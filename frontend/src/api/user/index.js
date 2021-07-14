import { apiServer } from 'settings/web-services/api';

export function updateUser(cfg) {
    return apiServer.post('/api/users/update', cfg);
}
