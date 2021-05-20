import { apiServer } from 'settings/web-services/api';

export function getVocabularyWorkSchedules() {
    return apiServer.get('/api/vocabulary/workSchedules');
}
