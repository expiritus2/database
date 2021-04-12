import Api from 'store/effects/core/api';
import {
    submitCompanyFormAction,
    uploadCompanyFilesAction,
    setCompanyFormStateAction,
    resetCompanyFormAction,
    setCompanyFormDataAction,
    updateCompanyFormAction,
} from 'store/actions/forms/company';
import { createCompany, updateCompany } from 'api/companies';
import { uploadFiles } from 'api/common';
import { getState } from 'store/index';
import { prepareData } from './helpers';

export const setCompanyFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setCompanyFormStateAction(cfg));
};

export const resetCompanyFormEffect = () => (dispatch) => {
    dispatch(resetCompanyFormAction());
};

export const submitCompanyFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execBase({ action: uploadCompanyFilesAction, method: uploadFiles });
    const sendRequest = Api.execBase({ action: submitCompanyFormAction, method: createCompany });
    const { forms: { company } } = getState();

    const formData = new FormData();

    company?.photos?.forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data: uploadedFiles } = response || {};
        const clonedCompany = prepareData(company, uploadedFiles);

        dispatch(sendRequest(clonedCompany, options, (err, resp) => {
            if (!err) {
                dispatch(resetCompanyFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};

export const updateCompanyFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execBase({ action: uploadCompanyFilesAction, method: uploadFiles });
    const sendRequest = Api.execBase({ action: updateCompanyFormAction, method: updateCompany });
    const { forms: { company } } = getState();

    const formData = new FormData();

    company?.photos?.filter((file) => file instanceof File).forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data: uploadedFiles } = response || {};
        const clonedCompany = prepareData(company, uploadedFiles);

        dispatch(sendRequest(clonedCompany, options, (err, resp) => {
            if (!err) {
                dispatch(resetCompanyFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};

export const setCompanyFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setCompanyFormDataAction(cfg));
};