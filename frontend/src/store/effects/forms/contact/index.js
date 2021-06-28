import Api from 'store/effects/core/api';
import {
    createContactAction,
    setContactFormStateAction,
    resetContactFormAction,
    setInitContactFormDataAction,
    updateContactAction,
} from 'store/actions/forms/contact';
import { createContact, updateContact } from 'api/contacts';
import { getState } from 'store/index';
import { get } from 'lodash-es';
import { prepareData } from './helpers';

export const setContactFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setContactFormStateAction(cfg));
};

export const resetContactFormEffect = () => (dispatch) => {
    dispatch(resetContactFormAction());
};

export const createContactEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: createContactAction, method: createContact });
    const formFields = get(getState(), 'forms.contact.data');

    const clonedContact = prepareData(formFields);

    return sendRequest(clonedContact, options, cb);
};

export const updateContactEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateContactAction, method: updateContact });
    const formFields = get(getState(), 'forms.contact.data');

    const clonedContact = prepareData(formFields);

    return sendRequest(clonedContact, options, cb);
};

export const setInitContactFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setInitContactFormDataAction(cfg));
};
