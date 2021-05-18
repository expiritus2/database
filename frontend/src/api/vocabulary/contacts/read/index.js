import { apiServer } from 'settings/web-services/api';

export function getVocabularyContacts() {
    return apiServer.get('/api/vocabulary/contacts');
}
