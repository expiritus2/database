import Api from 'store/effects/core/api';
import { getApplicantsAction } from 'store/actions/applicant';
import { getApplicants } from 'api/applicants';

export const getApplicantsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getApplicantsAction, method: getApplicants };

    let sendRequest = Api.execBase(requestParams);

    if (options.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
