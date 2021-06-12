import { apiServer } from 'settings/web-services/api';

export function saveVocabularySex(cfg) {
    return apiServer.post('/api/vocabulary/sexs', cfg);
}

export function saveVocabularySexs(cfg) {
    return apiServer.put('/api/vocabulary/sexs', cfg);
}
