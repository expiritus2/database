import { createAction } from 'redux-actions';

export const getVocabularySkillsAction = createAction('GET_VOCABULARY_SKILLS');
export const getVocabularyPositionsAction = createAction('GET_VOCABULARY_POSITIONS');
export const getVocabularyRegionsAction = createAction('GET_VOCABULARY_REGIONS');
export const setVocabularyModeAction = createAction('SET/VOCABULARY_MODE');

export const getVocabularyCompaniesAction = createAction('GET_VOCABULARY_COMPANIES');
export const getVocabularyContactsAction = createAction('GET_VOCABULARY_CONTACTS');
export const getUsersAction = createAction('GET_USERS');

export const saveVocabularySkillAction = createAction('SAVE_VOCABULARY_SKILL');
export const saveVocabularyPositionAction = createAction('SAVE_VOCABULARY_POSITION');
export const saveVocabularyRegionAction = createAction('SAVE_VOCABULARY_REGION');

export const deleteVocabularySkillAction = createAction('DELETE_VOCABULARY_SKILL');
export const updateVocabularySkillAction = createAction('UPDATE_VOCABULARY_SKILL');
