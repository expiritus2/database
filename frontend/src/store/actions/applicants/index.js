import { createAction } from 'redux-actions';

export const getApplicantsAction = createAction('GET_APPLICANTS');
export const resetCurrentApplicantAction = createAction('RESET_CURRENT_APPLICANT');
export const setApplicantsSearchAction = createAction('SET_APPLICANTS_SEARCH');
export const deleteApplicantAction = createAction('DELETE_APPLICANT');
export const getApplicantAction = createAction('GET_APPLICANT');
