import Api from 'store/effects/core/api';
import {
    submitContactFormAction,
    uploadContactFilesAction,
    setContactFormStateAction,
    resetContactFormAction,
    setContactFormDataAction,
    updateContactFormAction,
} from 'store/actions/forms/contact';
import { createContact, updateContact } from 'api/contacts';
import { uploadFiles } from 'api/common';
import { getState } from 'store/index';
import { prepareData } from './helpers';

export const setContactFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setContactFormStateAction(cfg));
};

export const resetContactFormEffect = () => (dispatch) => {
    dispatch(resetContactFormAction());
};

export const submitContactFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execResult({ action: uploadContactFilesAction, method: uploadFiles });
    const sendRequest = Api.execResult({ action: submitContactFormAction, method: createContact });
    const { forms: { contact } } = getState();

    const formData = new FormData();

    contact?.photos?.forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data: uploadedFiles } = response || {};
        const clonedContact = prepareData(contact, uploadedFiles);

        dispatch(sendRequest(clonedContact, options, (err, resp) => {
            if (!err) {
                dispatch(resetContactFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};

export const updateContactFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execResult({ action: uploadContactFilesAction, method: uploadFiles });
    const sendRequest = Api.execResult({ action: updateContactFormAction, method: updateContact });
    const { forms: { contact } } = getState();

    const formData = new FormData();

    contact?.photos?.filter((file) => file instanceof File).forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data: uploadedFiles } = response || {};
        const clonedContact = prepareData(contact, uploadedFiles);

        dispatch(sendRequest(clonedContact, options, (err, resp) => {
            if (!err) {
                dispatch(resetContactFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};

export const setContactFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setContactFormDataAction(cfg));
};
