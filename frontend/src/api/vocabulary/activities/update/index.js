import { apiServer } from 'settings/web-services/api';

export function updateVocabularyActivity(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/activities/${id}`, config);
}
