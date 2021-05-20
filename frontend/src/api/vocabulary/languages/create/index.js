import { apiServer } from 'settings/web-services/api';

export function saveVocabularyLanguage(cfg) {
    return apiServer.post('/api/vocabulary/languages', cfg);
}
