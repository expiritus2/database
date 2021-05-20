import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyWorkPlace(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/workPlaces/${cfg?.id}`);
}
