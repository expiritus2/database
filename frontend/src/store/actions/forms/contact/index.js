import { createAction } from 'redux-actions';

export const setContactFormStateAction = createAction('FORMS/SET_CONTACT_FORM_ACTION');
export const submitContactFormAction = createAction('FORMS/SUBMIT_CONTACT_FORM');
export const updateContactFormAction = createAction('FORMS/UPDATE_CONTACT_FORM');
export const uploadContactFilesAction = createAction('UPLOAD_CONTACT_FILES');
export const resetContactFormAction = createAction('FORMS/RESET_CONTACT_FORM');
export const setContactFormDataAction = createAction('SET_CONTACT_FORM_DATA');
