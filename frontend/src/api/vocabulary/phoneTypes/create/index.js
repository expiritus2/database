import { apiServer } from 'settings/web-services/api';

export function saveVocabularyPhoneType(cfg) {
    return apiServer.post('/api/vocabulary/phoneTypes', cfg);
}

export function saveVocabularyPhoneTypes(cfg) {
    return apiServer.put('/api/vocabulary/phoneTypes', cfg);
}
