import { createAction } from 'redux-actions';

export const setCompanyFormStateAction = createAction('FORMS/SET_COMPANY_FORM_ACTION');
export const createCompanyAction = createAction('FORMS/CREATE_COMPANY_FORM');
export const updateCompanyAction = createAction('FORMS/UPDATE_COMPANY');
export const resetCompanyFormAction = createAction('FORMS/RESET_COMPANY_FORM');
export const setInitCompanyFormDataAction = createAction('SET_INIT_COMPANY_FORM_DATA');
