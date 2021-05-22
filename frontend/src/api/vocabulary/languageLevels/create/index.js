import { apiServer } from 'settings/web-services/api';

export function saveVocabularyLanguageLevel(cfg) {
    return apiServer.post('/api/vocabulary/languageLevels', cfg);
}

export function saveVocabularyLanguageLevels(cfg) {
    return apiServer.put('/api/vocabulary/languageLevels', cfg);
}
