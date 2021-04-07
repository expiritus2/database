import { createAction } from 'redux-actions';

export const getContactsAction = createAction('GET_CONTACTS');
export const setCurrentContactAction = createAction('SET_CURRENT_CONTACT');
export const resetCurrentContactAction = createAction('RESET_CURRENT_CONTACT');
export const setContactsSearchAction = createAction('SET_CONTACTS_SEARCH');
export const requestRefreshContactsAction = createAction('REQUEST/REFRESH_CONTACTS');
