import { createAction } from 'redux-actions';

export const setApplicantFormStateAction = createAction('FORMS/SET_APPLICANT_FORM_ACTION');
export const setApplicantExperienceFormStateAction = createAction('FORMS/SET_APPLICANT_EXPERIENCE_FORM_ACTION');
export const submitApplicantFormAction = createAction('FORMS/SUBMIT_APPLICANT_FORM');
export const uploadFilesAction = createAction('UPLOAD_FILES');
export const resetApplicantFormSelector = createAction('FORMS/RESET_APPLICANT_FORM');
