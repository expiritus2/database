import { apiServer } from 'settings/web-services/api';

export function saveVocabularyCurrency(cfg) {
    return apiServer.post('/api/vocabulary/currencies', cfg);
}