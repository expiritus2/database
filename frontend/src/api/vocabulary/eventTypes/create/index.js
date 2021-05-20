import { apiServer } from 'settings/web-services/api';

export function saveVocabularyEventType(cfg) {
    return apiServer.post('/api/vocabulary/eventTypes', cfg);
}
