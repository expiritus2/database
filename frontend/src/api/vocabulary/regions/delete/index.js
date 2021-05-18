import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyRegion(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/regions/${cfg?.id}`);
}
