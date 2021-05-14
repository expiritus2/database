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

export function getVocabularyContacts() {
    return apiServer.get('/api/vocabulary/contacts');
}

export function getUsers() {
    return apiServer.get('/api/users');
}

export function saveVocabularySkill(cfg) {
    return apiServer.post('/api/vocabulary/skills', cfg);
}

export function saveVocabularyPosition(cfg) {
    return apiServer.post('/api/vocabulary/positions', cfg);
}

export function saveVocabularyRegion(cfg) {
    return apiServer.post('/api/vocabulary/regions', cfg);
}
