import { apiServer } from 'settings/web-services/api';

export function saveVocabularyPosition(cfg) {
    return apiServer.post('/api/vocabulary/positions', cfg);
}