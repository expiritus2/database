import { apiServer } from 'settings/web-services/api';

export function saveVocabularyActivity(cfg) {
    return apiServer.post('/api/vocabulary/activities', cfg);
}

export function saveVocabularyActivities(cfg) {
    return apiServer.put('/api/vocabulary/activities', cfg);
}
