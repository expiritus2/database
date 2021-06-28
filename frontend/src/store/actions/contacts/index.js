import { createAction } from 'redux-actions';

export const getContactsAction = createAction('GET_CONTACTS');
export const resetCurrentContactAction = createAction('RESET_CURRENT_CONTACT');
export const setContactsSearchAction = createAction('SET_CONTACTS_SEARCH');
export const deleteContactAction = createAction('DELETE_CONTACT');
export const getContactAction = createAction('GET_CONTACT');
