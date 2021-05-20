import { apiServer } from 'settings/web-services/api';

export function updateVocabularyWorkSchedule(cfg = {}) {
    const { id, ...config } = cfg;
    return apiServer.put(`/api/vocabulary/workSchedules/${id}`, config);
}
