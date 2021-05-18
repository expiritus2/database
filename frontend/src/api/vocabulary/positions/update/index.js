import { apiServer } from 'settings/web-services/api';

export function updateVocabularyPosition(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/positions/${id}`, config);
}
