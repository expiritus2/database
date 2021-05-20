import { apiServer } from 'settings/web-services/api';

export function saveVocabularyWorkSchedule(cfg) {
    return apiServer.post('/api/vocabulary/workSchedules', cfg);
}
