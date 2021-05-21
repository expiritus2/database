import { apiServer } from 'settings/web-services/api';

export function getVocabularyCurrencies() {
    return apiServer.get('/api/vocabulary/currencies');
}
