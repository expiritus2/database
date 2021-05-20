import { apiServer } from 'settings/web-services/api';

export function getVocabularyLinkTypes() {
    return apiServer.get('/api/vocabulary/linkTypes');
}
