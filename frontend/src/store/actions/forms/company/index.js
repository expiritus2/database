import { createAction } from 'redux-actions';

export const setCompanyFormStateAction = createAction('FORMS/SET_COMPANY_FORM_ACTION');
export const submitCompanyFormAction = createAction('FORMS/SUBMIT_COMPANY_FORM');
export const updateCompanyFormAction = createAction('FORMS/UPDATE_COMPANY_FORM');
export const uploadCompanyFilesAction = createAction('UPLOAD_COMPANY_FILES');
export const resetCompanyFormAction = createAction('FORMS/RESET_COMPANY_FORM');
export const setCompanyFormDataAction = createAction('SET_COMPANY_FORM_DATA');
