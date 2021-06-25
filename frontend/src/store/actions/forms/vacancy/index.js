import { createAction } from 'redux-actions';

export const setVacancyFormStateAction = createAction('FORMS/SET_VACANCY_FORM_ACTION');
export const createVacancyAction = createAction('FORMS/CREATE_VACANCY');
export const updateVacancyAction = createAction('FORMS/UPDATE_VACANCY');
export const resetVacancyFormAction = createAction('FORMS/RESET_VACANCY_FORM');
export const setInitVacancyFormDataAction = createAction('SET_INIT_VACANCY_FORM_DATA');
