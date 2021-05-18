import { apiServer } from 'settings/web-services/api';

export function getVocabularySkills() {
    return apiServer.get('/api/vocabulary/skills');
}
