import { apiServer } from 'settings/web-services/api';

export function getCurrentUser() {
    return apiServer.get('/api/auth/current-user');
}

export function login(cfg) {
    return apiServer.post('/api/auth/login', cfg);
}

export function logout(cfg) {
    return apiServer.get('/api/auth/logout', cfg);
}

export function enrollAccount(cfg) {
    return apiServer.post('/api/auth/enrollAccount', cfg);
}

export function invite(cfg) {
    return apiServer.post('/api/auth/invite', cfg);
}
