import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyEventType(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/eventTypes/${cfg?.id}`);
}
