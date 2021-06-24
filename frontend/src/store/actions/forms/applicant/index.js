import { createAction } from 'redux-actions';

export const setApplicantFormStateAction = createAction('FORMS/SET_APPLICANT_FORM_ACTION');
export const createApplicantAction = createAction('FORMS/CREATE_APPLICANT');
export const updateApplicantAction = createAction('FORMS/UPDATE_APPLICANT');
export const resetApplicantFormAction = createAction('FORMS/RESET_APPLICANT_FORM');
export const setInitApplicantFormDataAction = createAction('SET_INIT_APPLICANT_FORM_DATA');
