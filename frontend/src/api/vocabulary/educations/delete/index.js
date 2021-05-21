import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyEducation(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/educations/${cfg?.id}`);
}
