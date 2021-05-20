import { apiServer } from 'settings/web-services/api';

export function getVocabularyLanguageLevels() {
    return apiServer.get('/api/vocabulary/languageLevels');
}
