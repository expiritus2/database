import { apiServer } from 'settings/web-services/api';

export function getVocabularyActivities() {
    return apiServer.get('/api/vocabulary/activities');
}
