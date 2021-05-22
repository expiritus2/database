import { apiServer } from 'settings/web-services/api';

export function saveVocabularyWorkPlace(cfg) {
    return apiServer.post('/api/vocabulary/workPlaces', cfg);
}

export function saveVocabularyWorkPlaces(cfg) {
    return apiServer.put('/api/vocabulary/workPlaces', cfg);
}
