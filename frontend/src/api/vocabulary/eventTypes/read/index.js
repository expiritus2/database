import { apiServer } from 'settings/web-services/api';

export function getVocabularyEventTypes() {
    return apiServer.get('/api/vocabulary/eventTypes');
}
