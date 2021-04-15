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
import { createApplicant, updateApplicant } from 'api/applicants';
import { uploadFiles } from 'api/common';
import { getState } from 'store/index';
import { uniqueId } from 'lodash-es';
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
        if (file?.data) {
            formData.append('files', file?.data);
        }
    });

    applicant?.photos?.forEach((photo) => {
        if (photo?.data) {
            formData.append('photos', photo?.data);
        }
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

    applicant?.files?.forEach((file) => {
        if (file?.data) {
            formData.append('files', file?.data);
        }
    });

    applicant?.photos?.forEach((photo) => {
        if (photo?.data) {
            formData.append('photos', photo?.data);
        }
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
    const config = {
        ...cfg,
        photos: cfg.photos.map((photoUrl) => ({ url: photoUrl })),
        files: cfg.files.map((fileUrl) => ({ id: uniqueId(), url: fileUrl })),
    };
    dispatch(setApplicantFormDataAction(config));
};
