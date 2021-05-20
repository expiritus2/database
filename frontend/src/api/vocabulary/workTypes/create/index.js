import { apiServer } from 'settings/web-services/api';

export function saveVocabularyWorkType(cfg) {
    return apiServer.post('/api/vocabulary/workTypes', cfg);
}
