import { apiServer } from 'settings/web-services/api';

export function getVocabularyResources() {
    return apiServer.get('/api/vocabulary/resources');
}

export function getVocabularyPositions() {
    return apiServer.get('/api/vocabulary/positions');
}

export function getVocabularyRegions() {
    return apiServer.get('/api/vocabulary/regions');
}

export function getVocabularySkills() {
    return apiServer.get('/api/vocabulary/skills');
}

export function getVocabularyCompanies() {
    return apiServer.get('/api/vocabulary/companies');
}
