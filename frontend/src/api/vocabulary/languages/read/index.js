import { apiServer } from 'settings/web-services/api';

export function getVocabularyLanguages() {
    return apiServer.get('/api/vocabulary/languages');
}
