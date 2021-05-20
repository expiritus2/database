import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyLanguage(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/languages/${cfg?.id}`);
}
