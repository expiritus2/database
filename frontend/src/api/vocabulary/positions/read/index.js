import { apiServer } from 'settings/web-services/api';

export function getVocabularyPositions() {
    return apiServer.get('/api/vocabulary/positions');
}
