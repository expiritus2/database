import { apiServer } from 'settings/web-services/api';

export function saveVocabularyLanguageLevel(cfg) {
    return apiServer.post('/api/vocabulary/languageLevels', cfg);
}
