import { apiServer } from 'settings/web-services/api';

export function updateVocabularyEducation(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/educations/${id}`, config);
}
