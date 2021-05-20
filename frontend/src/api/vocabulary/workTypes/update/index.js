import { apiServer } from 'settings/web-services/api';

export function updateVocabularyWorkType(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/workTypes/${id}`, config);
}
