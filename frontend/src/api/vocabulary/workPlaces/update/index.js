import { apiServer } from 'settings/web-services/api';

export function updateVocabularyWorkPlace(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/workPlaces/${id}`, config);
}
