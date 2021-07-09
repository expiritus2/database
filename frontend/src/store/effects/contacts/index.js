import Api from 'store/effects/core/api';
import {
    getContactsAction,
    resetCurrentContactAction,
    setContactsSearchAction,
    getContactAction,
    deleteContactAction,
} from 'store/actions/contacts';
import { getContacts, getContact, deleteContact } from 'api/contacts';
import { getState } from 'store';
import { getSearchConfig } from './helpers';

export const getContactsEffect = (cfg, options = {}, cb) => {
    const sendRequest = Api.execResult({ action: getContactsAction, method: getContacts });
    const { contacts, drawers } = getState();

    const config = getSearchConfig(cfg, contacts, drawers?.contactSearch?.formFields);

    return sendRequest(config, options, cb);
};

export const getContactEffect = (cfg, options = {}, cb) => {
    const sendRequest = Api.execResult({ action: getContactAction, method: getContact });

    return sendRequest(cfg, options, cb);
};

export const resetContactEffect = () => (dispatch) => {
    dispatch(resetCurrentContactAction());
};

export const setContactsSearchEffect = (cfg = {}) => (dispatch) => {
    const { contacts } = getState();
    dispatch(setContactsSearchAction({ ...(contacts?.search || {}), ...cfg }));
};

export const deleteContactEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteContactAction, method: deleteContact });

    const { contacts } = getState();

    const config = {
        id: cfg?.id,
        ...getSearchConfig(cfg, contacts),
    };

    return sendRequest(config, options, cb);
};
