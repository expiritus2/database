import { apiServer } from 'settings/web-services/api';

export function deleteVocabularySex(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/sexs/${cfg?.id}`);
}
