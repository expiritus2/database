import { apiServer } from 'settings/web-services/api';

export function updateVocabularyLinkType(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/linkTypes/${id}`, config);
}
