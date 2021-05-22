import { apiServer } from 'settings/web-services/api';

export function saveVocabularyEducation(cfg) {
    return apiServer.post('/api/vocabulary/educations', cfg);
}

export function saveVocabularyEducations(cfg) {
    return apiServer.put('/api/vocabulary/educations', cfg);
}
