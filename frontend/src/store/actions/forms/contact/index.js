import { createAction } from 'redux-actions';

export const setContactFormStateAction = createAction('FORMS/SET_CONTACT_FORM_ACTION');
export const createContactAction = createAction('FORMS/CREATE_CONTACT_FORM');
export const updateContactAction = createAction('FORMS/UPDATE_CONTACT');
export const resetContactFormAction = createAction('FORMS/RESET_CONTACT_FORM');
export const setInitContactFormDataAction = createAction('SET_INIT_CONTACT_FORM_DATA');
