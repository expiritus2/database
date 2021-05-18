import { apiServer } from 'settings/web-services/api';

export function saveVocabularySkill(cfg) {
    return apiServer.post('/api/vocabulary/skills', cfg);
}
