import { apiServer } from 'settings/web-services/api';

export function deleteVocabularySkill(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/skills/${cfg?.id}`);
}
