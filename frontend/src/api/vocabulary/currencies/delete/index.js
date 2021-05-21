import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyCurrency(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/currencies/${cfg?.id}`);
}
