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
    submitApplicantForm,
} from 'store/actions/forms';
import { createApplicant } from 'api/applicant';
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

export const submitApplicantFormEffect = (cfg, options, cb) => {
    const sendRequest = Api.execBase({ action: submitApplicantForm, method: createApplicant });
    const { forms: { applicant } } = getState();

    Logger.log(applicant);
    return sendRequest(cfg, options, cb);
};
