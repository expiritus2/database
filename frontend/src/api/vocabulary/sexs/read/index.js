import { apiServer } from 'settings/web-services/api';

export function getVocabularySexs() {
    return apiServer.get('/api/vocabulary/sexs');
}
