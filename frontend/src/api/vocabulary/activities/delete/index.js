import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyActivity(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/activities/${cfg?.id}`);
}
