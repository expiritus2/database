import { apiServer } from 'settings/web-services/api';

export function getVocabularyPhoneTypes() {
    return apiServer.get('/api/vocabulary/phoneTypes');
}
