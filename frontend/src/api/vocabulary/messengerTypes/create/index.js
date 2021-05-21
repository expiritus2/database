import { apiServer } from 'settings/web-services/api';

export function saveVocabularyMessengerType(cfg) {
    return apiServer.post('/api/vocabulary/messengerTypes', cfg);
}
