import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyMessengerType(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/messengerTypes/${cfg?.id}`);
}
