import { apiServer } from 'settings/web-services/api';

export function saveVocabularyWorkPlace(cfg) {
    return apiServer.post('/api/vocabulary/workPlaces', cfg);
}
