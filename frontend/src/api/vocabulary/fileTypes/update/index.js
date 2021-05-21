import { apiServer } from 'settings/web-services/api';

export function updateVocabularyFileType(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/fileTypes/${id}`, config);
}
