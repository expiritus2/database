import { apiServer } from 'settings/web-services/api';

export function getVocabularyWorkTypes() {
    return apiServer.get('/api/vocabulary/workTypes');
}
