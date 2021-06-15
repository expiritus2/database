import Api from 'store/effects/core/api';
import {
    setApplicantExperienceFormStateAction,
    createApplicantAction,
    setApplicantFormStateAction,
    resetApplicantFormAction,
    setApplicantFormDataAction,
    updateApplicantAction,
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

export const createApplicantFormEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: createApplicantAction, method: createApplicant });
    const { forms: { applicant } } = getState();

    const clonedApplicant = prepareData(applicant);

    return sendRequest(clonedApplicant, options, cb);
};

export const updateApplicantFormEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateApplicantAction, method: updateApplicant });
    const { forms: { applicant } } = getState();

    const clonedApplicant = prepareData(applicant);

    return sendRequest(clonedApplicant, options, cb);
};

export const setApplicantFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantFormDataAction(cfg));
};
