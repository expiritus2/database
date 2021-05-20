import { apiServer } from 'settings/web-services/api';

export function updateVocabularyLanguage(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/languages/${id}`, config);
}
