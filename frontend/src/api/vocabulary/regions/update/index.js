import { apiServer } from 'settings/web-services/api';

export function updateVocabularyRegion(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/regions/${id}`, config);
}