import { apiServer } from 'settings/web-services/api';

export function getVocabularyMessengerTypes() {
    return apiServer.get('/api/vocabulary/messengerTypes');
}
