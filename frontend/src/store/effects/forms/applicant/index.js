import Api from 'store/effects/core/api';
import {
    setApplicantExperienceFormStateAction,
    submitApplicantFormAction,
    setApplicantFormStateAction,
    resetApplicantFormAction,
    setApplicantFormDataAction,
    updateApplicantFormAction,
} from 'store/actions/forms/applicant';
import { createApplicant, updateApplicant } from 'api/applicants';
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

export const submitApplicantFormEffect = (cfg, options, cb) => {
    const sendRequest = Api.execBase({ action: submitApplicantFormAction, method: createApplicant });
    const { forms: { applicant } } = getState();

    const clonedApplicant = prepareData(applicant);

    return sendRequest(clonedApplicant, options, cb);
};

export const updateApplicantFormEffect = (cfg, options, cb) => () => {
    const sendRequest = Api.execBase({ action: updateApplicantFormAction, method: updateApplicant });
    const { forms: { applicant } } = getState();

    const clonedApplicant = prepareData(applicant);

    return sendRequest(clonedApplicant, options, cb);
};

export const setApplicantFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantFormDataAction(cfg));
};
