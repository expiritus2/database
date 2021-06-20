import Api from 'store/effects/core/api';
import {
    getApplicantsAction,
    setCurrentApplicantAction,
    resetCurrentApplicantAction,
    setApplicantsSearchAction,
    deleteApplicantAction,
} from 'store/actions/applicants';
import { getApplicants, deleteApplicant } from 'api/applicants';
import { getState } from 'store';
import { get } from 'lodash-es';
import { getSearchConfig } from './helpers';

export const getApplicantsEffect = (cfg, options = {}, cb) => {
    const sendRequest = Api.execResult({ action: getApplicantsAction, method: getApplicants });
    const { applicants } = getState();

    const config = getSearchConfig(cfg, applicants);

    return sendRequest(config, options, cb);
};

export const setCurrentApplicantEffect = (cfg) => (dispatch) => {
    const state = getState();
    const applicants = get(state, 'applicants.data.rows', []);
    const applicant = applicants.find((candidate) => candidate.id === cfg?.id);

    if (applicant) {
        dispatch(setCurrentApplicantAction(applicant));
    }
};

export const resetApplicantEffect = () => (dispatch) => {
    dispatch(resetCurrentApplicantAction());
};

export const setApplicantsSearchEffect = (cfg = {}) => (dispatch) => {
    const { applicants } = getState();
    dispatch(setApplicantsSearchAction({ ...(applicants?.search || {}), ...cfg }));
};

export const deleteApplicantEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteApplicantAction, method: deleteApplicant });

    const { applicants } = getState();

    const config = {
        id: cfg?.id,
        ...getSearchConfig(cfg, applicants),
    };

    return sendRequest(config, options, cb);
};
