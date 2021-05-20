import { apiServer } from 'settings/web-services/api';

export function updateVocabularyEventType(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/eventTypes/${id}`, config);
}
