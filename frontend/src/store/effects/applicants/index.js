import Api from 'store/effects/core/api';
import {
    getApplicantsAction,
    resetCurrentApplicantAction,
    setApplicantsSearchAction,
    deleteApplicantAction,
    getApplicantAction,
} from 'store/actions/applicants';
import { getApplicants, deleteApplicant, getApplicant } from 'api/applicants';
import { getState } from 'store';
import { getSearchConfig } from './helpers';

export const getApplicantsEffect = (cfg, options = {}, cb) => {
    const sendRequest = Api.execResult({ action: getApplicantsAction, method: getApplicants });
    const { applicants } = getState();

    const config = getSearchConfig(cfg, applicants);

    return sendRequest(config, options, cb);
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

export const getApplicantEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: getApplicantAction, method: getApplicant });

    return sendRequest(cfg, options, cb);
};
