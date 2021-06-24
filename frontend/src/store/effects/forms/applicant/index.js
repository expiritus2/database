import Api from 'store/effects/core/api';
import {
    createApplicantAction,
    setApplicantFormStateAction,
    resetApplicantFormAction,
    setInitApplicantFormDataAction,
    updateApplicantAction,
} from 'store/actions/forms/applicant';
import { createApplicant, updateApplicant } from 'api/applicants';
import { getState } from 'store/index';
import { get } from 'lodash-es';
import { prepareData } from './helpers';

export const setApplicantFormStateEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantFormStateAction(cfg));
};

export const resetApplicantFormEffect = () => (dispatch) => {
    dispatch(resetApplicantFormAction());
};

export const createApplicantFormEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: createApplicantAction, method: createApplicant });
    const formFields = get(getState(), 'forms.applicant.data');

    const clonedApplicant = prepareData(formFields);

    return sendRequest(clonedApplicant, options, cb);
};

export const updateApplicantFormEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateApplicantAction, method: updateApplicant });
    const formFields = get(getState(), 'forms.applicant.data');

    const clonedApplicant = prepareData(formFields);

    return sendRequest(clonedApplicant, options, cb);
};

export const setInitApplicantFormDataEffect = (cfg) => (dispatch) => {
    dispatch(setInitApplicantFormDataAction(cfg));
};
