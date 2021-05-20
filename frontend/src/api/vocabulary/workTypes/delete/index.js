import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyWorkType(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/workTypes/${cfg?.id}`);
}
