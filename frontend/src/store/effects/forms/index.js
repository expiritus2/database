import Api from 'store/effects/core/api';
import {
    setProfileFormStateAction,
    resetProfileFormStateAction,
    setInfoFormStateAction,
    resetInfoFormStateAction,
    setExperienceFormStateAction,
    resetExperienceFormStateAction,
    setFilesFormStateAction,
    resetFilesFormStateAction,
    submitApplicantFormAction,
    uploadFilesAction,
} from 'store/actions/forms';
import { createApplicant, uploadFiles } from 'api/applicant';
import { getState } from 'store';
import { Logger } from 'services';

export const setProfileFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setProfileFormStateAction(cfg));
};

export const resetProfileFormStateEffect = () => (dispatch) => {
    dispatch(resetProfileFormStateAction());
};

export const setInfoFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setInfoFormStateAction(cfg));
};

export const resetInfoFormStateEffect = () => (dispatch) => {
    dispatch(resetInfoFormStateAction());
};

export const setExperienceFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setExperienceFormStateAction(cfg));
};

export const resetExperienceFormStateEffect = () => (dispatch) => {
    dispatch(resetExperienceFormStateAction());
};

export const setFilesFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setFilesFormStateAction(cfg));
};

export const resetFilesFormStateEffect = () => (dispatch) => {
    dispatch(resetFilesFormStateAction());
};

export const submitApplicantFormEffect = (cfg, options, cb) => (dispatch) => {
    // const sendRequest = Api.execBase({ action: submitApplicantFormAction, method: createApplicant });
    const sendUploadFiles = Api.execBase({ action: uploadFilesAction, method: uploadFiles });
    const { forms: { applicant } } = getState();

    const formData = new FormData();
    applicant?.files?.files?.forEach((file) => {
        formData.append('files', file);
    });

    applicant?.info?.photos?.forEach((photo) => {
        formData.append('photos', photo);
    });

    dispatch(sendUploadFiles(formData, options, (err, response) => {
        Logger.log(err, response);
        cb?.(err, response);
    }));
};
