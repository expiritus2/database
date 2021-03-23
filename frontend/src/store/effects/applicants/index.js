import Api from 'store/effects/core/api';
import {
    getApplicantsAction,
    setCurrentApplicantAction,
    resetCurrentApplicantAction,
    setApplicantsSearchAction,
    requestRefreshApplicantsAction,
} from 'store/actions/applicants';
import { getApplicants } from 'api/applicants';
import { getState } from 'store';
import { get } from 'lodash-es';

export const getApplicantsEffect = (cfg, options = {}, cb) => {
    const { applicants } = getState();
    const requestParams = { action: getApplicantsAction, method: getApplicants };

    let sendRequest = Api.execBase(requestParams);

    if (options.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    const config = {
        search: applicants?.search?.string || undefined,
        active: applicants?.search?.active || undefined,
    };

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

export const setApplicantsSearchEffect = (cfg) => (dispatch) => {
    dispatch(setApplicantsSearchAction(cfg));
};

export const requestRefreshApplicantsEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: requestRefreshApplicantsAction, method: getApplicants });

    return sendRequest(cfg, options, cb);
};
