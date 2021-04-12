import { createAction } from 'redux-actions';

export const getCompaniesAction = createAction('GET_COMPANIES');
export const setCurrentCompanyAction = createAction('SET_CURRENT_COMPANY');
export const resetCurrentCompanyAction = createAction('RESET_CURRENT_COMPANY');
export const setCompaniesSearchAction = createAction('SET_COMPANIES_SEARCH');
export const requestRefreshCompaniesAction = createAction('REQUEST/REFRESH_COMPANIES');
