import { apiServer } from 'settings/web-services/api';

export function updateVocabularySkill(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/skills/${id}`, config);
}
