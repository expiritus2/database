import Api from 'store/effects/core/api';
import { getApplicantsAction, setCurrentApplicantAction, resetCurrentApplicantAction } from 'store/actions/applicants';
import { getApplicants } from 'api/applicants';
import { getState } from 'store';
import { get } from 'lodash-es';

export const getApplicantsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getApplicantsAction, method: getApplicants };

    let sendRequest = Api.execBase(requestParams);

    if (options.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
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
