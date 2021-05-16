import { apiServer } from 'settings/web-services/api';

export function saveVocabularySkill(cfg) {
    return apiServer.post('/api/vocabulary/skills', cfg);
}

export function saveVocabularyPosition(cfg) {
    return apiServer.post('/api/vocabulary/positions', cfg);
}

export function saveVocabularyRegion(cfg) {
    return apiServer.post('/api/vocabulary/regions', cfg);
}
