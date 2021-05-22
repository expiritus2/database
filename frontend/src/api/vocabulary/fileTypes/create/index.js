import { apiServer } from 'settings/web-services/api';

export function saveVocabularyFileType(cfg) {
    return apiServer.post('/api/vocabulary/fileTypes', cfg);
}

export function saveVocabularyFileTypes(cfg) {
    return apiServer.put('/api/vocabulary/fileTypes', cfg);
}
