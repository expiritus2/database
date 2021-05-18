import { apiServer } from 'settings/web-services/api';

export function getVocabularyRegions() {
    return apiServer.get('/api/vocabulary/regions');
}
