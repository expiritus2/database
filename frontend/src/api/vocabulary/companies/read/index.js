import { apiServer } from 'settings/web-services/api';

export function getVocabularyCompanies() {
    return apiServer.get('/api/vocabulary/companies');
}
