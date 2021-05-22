import { apiServer } from 'settings/web-services/api';

export function saveVocabularyWorkSchedule(cfg) {
    return apiServer.post('/api/vocabulary/workSchedules', cfg);
}

export function saveVocabularyWorkSchedules(cfg) {
    return apiServer.put('/api/vocabulary/workSchedules', cfg);
}
