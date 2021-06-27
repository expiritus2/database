import { createAction } from 'redux-actions';

export const getVacanciesAction = createAction('GET_VACANCIES');
export const resetCurrentVacancyAction = createAction('RESET_CURRENT_VACANCY');
export const setVacanciesSearchAction = createAction('SET_VACANCIES_SEARCH');
export const deleteVacancyAction = createAction('DELETE_VACANCY');
export const getVacancyAction = createAction('GET_VACANCY');
