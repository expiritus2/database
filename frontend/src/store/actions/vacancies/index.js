import { createAction } from 'redux-actions';

export const getVacanciesAction = createAction('GET_VACANCIES');
export const setCurrentVacancyAction = createAction('SET_CURRENT_VACANCY');
export const resetCurrentVacancyAction = createAction('RESET_CURRENT_VACANCY');
export const setVacanciesSearchAction = createAction('SET_VACANCIES_SEARCH');
export const requestRefreshVacanciesAction = createAction('REQUEST/REFRESH_VACANCIES');
