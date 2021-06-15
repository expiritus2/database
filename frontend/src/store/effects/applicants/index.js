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
    const sendRequest = Api.execResult({ action: getApplicantsAction, method: getApplicants });
    const { applicants } = getState();

    const config = {
        search: applicants?.search?.string || undefined,
        active: applicants?.search?.active || undefined,
        page: cfg?.page ?? applicants?.meta?.page,
        countPerPage: cfg?.countPerPage ?? applicants?.meta?.countPerPage,
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

export const setApplicantsSearchEffect = (cfg = {}) => (dispatch) => {
    const { applicants } = getState();
    dispatch(setApplicantsSearchAction({ ...(applicants?.search || {}), ...cfg }));
};

export const requestRefreshApplicantsEffect = Api.execResult({
    action: requestRefreshApplicantsAction,
    method: getApplicants,
});
