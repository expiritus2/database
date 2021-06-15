import Api from 'store/effects/core/api';
import {
    getContactsAction,
    setCurrentContactAction,
    resetCurrentContactAction,
    setContactsSearchAction,
    requestRefreshContactsAction,
} from 'store/actions/contacts';
import { getContacts } from 'api/contacts';
import { getState } from 'store';
import { get } from 'lodash-es';

export const getContactsEffect = (cfg, options = {}, cb) => {
    const { contacts } = getState();

    const sendRequest = Api.execResult({ action: getContactsAction, method: getContacts });

    const config = {
        search: contacts?.search?.string || undefined,
        active: contacts?.search?.active || undefined,
        page: cfg?.page ?? contacts?.meta?.page,
        countPerPage: cfg?.countPerPage ?? contacts?.meta?.countPerPage,
    };

    return sendRequest(config, options, cb);
};

export const setCurrentContactEffect = (cfg) => (dispatch) => {
    const state = getState();
    const contacts = get(state, 'contacts.data.rows', []);
    const contactInfo = contacts.find((contact) => contact.id === cfg?.id);

    if (contactInfo) {
        dispatch(setCurrentContactAction(contactInfo));
    }
};

export const resetContactEffect = () => (dispatch) => {
    dispatch(resetCurrentContactAction());
};

export const setContactsSearchEffect = (cfg = {}) => (dispatch) => {
    const { contacts } = getState();
    dispatch(setContactsSearchAction({ ...(contacts?.search || {}), ...cfg }));
};

export const requestRefreshContactsEffect = Api.execResult({
    action: requestRefreshContactsAction,
    method: getContacts,
});
