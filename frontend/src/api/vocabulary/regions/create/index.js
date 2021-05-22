import { apiServer } from 'settings/web-services/api';

export function saveVocabularyRegion(cfg) {
    return apiServer.post('/api/vocabulary/regions', cfg);
}

export function saveVocabularyRegions(cfg) {
    return apiServer.put('/api/vocabulary/regions', cfg);
}
