import { apiServer } from 'settings/web-services/api';

export function getVocabularyEducations() {
    return apiServer.get('/api/vocabulary/educations');
}
