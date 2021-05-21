import { apiServer } from 'settings/web-services/api';

export function getVocabularyFileTypes() {
    return apiServer.get('/api/vocabulary/fileTypes');
}
