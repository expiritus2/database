import Api from 'store/effects/core/api';
import {
    setApplicantExperienceFormStateAction,
    submitApplicantFormAction,
    uploadFilesAction,
    setApplicantFormStateAction,
    resetApplicantFormAction,
    setApplicantFormDataAction,
    updateApplicantFormAction,
} from 'store/actions/forms/applicant';
import { createApplicant, updateApplicant, uploadFiles } from 'api/applicants';
import { getState } from 'store/index';
import { prepareData } from './helpers';

export const setApplicantFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantFormStateAction(cfg));
};

export const setApplicantExperienceFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantExperienceFormStateAction(cfg));
};

export const resetApplicantFormEffect = () => (dispatch) => {
    dispatch(resetApplicantFormAction());
};

export const submitApplicantFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execBase({ action: uploadFilesAction, method: uploadFiles });
    const sendRequest = Api.execBase({ action: submitApplicantFormAction, method: createApplicant });
    const { forms: { applicant } } = getState();

    const formData = new FormData();
    applicant?.files?.forEach((file) => {
        formData.append('files', file);
    });

    applicant?.photos?.forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data: uploadedFiles } = response || {};
        const clonedApplicant = prepareData(applicant, uploadedFiles);

        dispatch(sendRequest(clonedApplicant, options, (err, resp) => {
            if (!err) {
                dispatch(resetApplicantFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};

export const updateApplicantFormEffect = (cfg, options, cb) => (dispatch) => {
    const sendUploadFiles = Api.execBase({ action: uploadFilesAction, method: uploadFiles });
    const sendRequest = Api.execBase({ action: updateApplicantFormAction, method: updateApplicant });
    const { forms: { applicant } } = getState();

    const formData = new FormData();
    applicant?.files?.filter((file) => file instanceof File).forEach((file) => {
        formData.append('files', file);
    });

    applicant?.photos?.filter((file) => file instanceof File).forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (error, response) => {
        const { data: uploadedFiles } = response || {};
        const clonedApplicant = prepareData(applicant, uploadedFiles);

        dispatch(sendRequest(clonedApplicant, options, (err, resp) => {
            if (!err) {
                dispatch(resetApplicantFormEffect());
            }

            cb?.(err, resp);
        }));
    }));
};

export const setApplicantFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantFormDataAction(cfg));
};
