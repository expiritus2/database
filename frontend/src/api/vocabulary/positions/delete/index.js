import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyPosition(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/positions/${cfg?.id}`);
}
