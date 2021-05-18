import { apiServer } from 'settings/web-services/api';

export function getUsers() {
    return apiServer.get('/api/users');
}
