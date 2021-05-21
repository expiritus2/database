import { apiServer } from 'settings/web-services/api';

export function updateVocabularyMessengerType(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/messengerTypes/${id}`, config);
}
