import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyPhoneType(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/phoneTypes/${cfg?.id}`);
}
