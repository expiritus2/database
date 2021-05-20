import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyLanguageLevel(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/languageLevels/${cfg?.id}`);
}
