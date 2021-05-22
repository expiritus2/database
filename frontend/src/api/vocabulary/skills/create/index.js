import { apiServer } from 'settings/web-services/api';

export function saveVocabularySkill(cfg) {
    return apiServer.post('/api/vocabulary/skills', cfg);
}

export function saveVocabularySkills(cfg) {
    return apiServer.put('/api/vocabulary/skills', cfg);
}
