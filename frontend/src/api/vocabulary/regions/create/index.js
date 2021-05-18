import { apiServer } from 'settings/web-services/api';

export function saveVocabularyRegion(cfg) {
    return apiServer.post('/api/vocabulary/regions', cfg);
}
