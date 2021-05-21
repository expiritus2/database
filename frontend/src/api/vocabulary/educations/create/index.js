import { apiServer } from 'settings/web-services/api';

export function saveVocabularyEducation(cfg) {
    return apiServer.post('/api/vocabulary/educations', cfg);
}
