import { createAction } from 'redux-actions';

export const getCompaniesAction = createAction('GET_COMPANIES');
export const resetCurrentCompanyAction = createAction('RESET_CURRENT_COMPANY');
export const setCompaniesSearchAction = createAction('SET_COMPANIES_SEARCH');
export const deleteCompanyAction = createAction('DELETE_COMPANY');
export const getCompanyAction = createAction('GET_COMPANY');
