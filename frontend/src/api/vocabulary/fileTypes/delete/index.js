import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyFileType(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/fileTypes/${cfg?.id}`);
}
