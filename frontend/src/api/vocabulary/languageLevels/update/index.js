import { apiServer } from 'settings/web-services/api';

export function updateVocabularyLanguageLevel(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/languageLevels/${id}`, config);
}
