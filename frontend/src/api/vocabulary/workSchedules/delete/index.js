import { apiServer } from 'settings/web-services/api';

export function deleteVocabularyWorkSchedule(cfg = {}) {
    return apiServer.delete(`/api/vocabulary/workSchedules/${cfg?.id}`);
}
