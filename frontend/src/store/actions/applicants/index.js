import { createAction } from 'redux-actions';

export const getApplicantsAction = createAction('GET_APPLICANTS');
export const setCurrentApplicantAction = createAction('SET_CURRENT_APPLICANT');
export const resetCurrentApplicantAction = createAction('RESET_CURRENT_APPLICANT');
