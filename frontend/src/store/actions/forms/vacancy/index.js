import { createAction } from 'redux-actions';

export const setVacancyFormStateAction = createAction('FORMS/SET_VACANCY_FORM_ACTION');
export const submitVacancyFormAction = createAction('FORMS/SUBMIT_VACANCY_FORM');
export const updateVacancyFormAction = createAction('FORMS/UPDATE_VACANCY_FORM');
export const uploadVacancyFilesAction = createAction('UPLOAD_VACANCY_FILES');
export const resetVacancyFormAction = createAction('FORMS/RESET_VACANCY_FORM');
export const setVacancyFormDataAction = createAction('SET_VACANCY_FORM_DATA');
