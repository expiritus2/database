import { apiServer } from 'settings/web-services/api';

export function updateVocabularySkill(cfg) {
    return apiServer.put(`/api/vocabulary/skills/${cfg?.id}`, cfg);
}
