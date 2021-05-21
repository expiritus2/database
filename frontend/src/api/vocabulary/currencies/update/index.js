import { apiServer } from 'settings/web-services/api';

export function updateVocabularyCurrency(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/currencies/${id}`, config);
}
