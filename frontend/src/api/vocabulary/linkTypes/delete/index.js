import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyLinkType(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/linkTypes/${cfg?.id}`);
}
