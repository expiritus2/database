import { apiServer } from 'settings/web-services/api';

export function saveVocabularyLinkType(cfg) {
    return apiServer.post('/api/vocabulary/linkTypes', cfg);
}
