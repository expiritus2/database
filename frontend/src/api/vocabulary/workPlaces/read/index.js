import { apiServer } from 'settings/web-services/api';

export function getVocabularyWorkPlaces() {
    return apiServer.get('/api/vocabulary/workPlaces');
}
