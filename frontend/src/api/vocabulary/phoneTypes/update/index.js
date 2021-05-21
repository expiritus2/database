import { apiServer } from 'settings/web-services/api';

export function updateVocabularyPhoneType(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/phoneTypes/${id}`, config);
}
