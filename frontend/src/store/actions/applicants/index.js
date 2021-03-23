import { createAction } from 'redux-actions';

export const getApplicantsAction = createAction('GET_APPLICANTS');
export const setCurrentApplicantAction = createAction('SET_CURRENT_APPLICANT');
export const resetCurrentApplicantAction = createAction('RESET_CURRENT_APPLICANT');
export const setApplicantsSearchAction = createAction('SET_APPLICANTS_SEARCH');
export const requestRefreshApplicantsAction = createAction('REQUEST/REFRESH_APPLICANTS');
