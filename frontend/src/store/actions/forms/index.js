import { createAction } from 'redux-actions';

export const setProfileFormStateAction = createAction('FORMS/SET_PROFILE_FORM_ACTION');
export const resetProfileFormStateAction = createAction('FORMS/RESET_PROFILE_FORM_ACTION');

export const setInfoFormStateAction = createAction('FORMS/SET_INFO_FORM_ACTION');
export const resetInfoFormStateAction = createAction('FORMS/RESET_INFO_FORM_ACTION');

export const setExperienceFormStateAction = createAction('FORMS/SET_EXPERIENCE_FORM_ACTION');
export const resetExperienceFormStateAction = createAction('FORMS/RESET_EXPERIENCE_FORM_ACTION');

export const setFilesFormStateAction = createAction('FORMS/SET_FILES_FORM_ACTION');
export const resetFilesFormStateAction = createAction('FORMS/RESET_FILES_FORM_ACTION');

export const submitApplicantFormAction = createAction('FORMS/SUBMIT_APPLICANT_FORM');
export const uploadFilesAction = createAction('UPLOAD_FILES');
