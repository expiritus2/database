import { apiServer } from 'settings/web-services/api';

export function createContact(cfg) {
    return apiServer.post('/api/contacts/create', cfg);
}

export function updateContact(cfg) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/contacts/${id}`, config);
}

export function getContacts(cfg) {
    return apiServer.get('/api/contacts', { params: cfg });
}
