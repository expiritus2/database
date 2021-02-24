import Api from 'store/effects/core/api';
import { requestGetCurrentUserAction, requestPostLoginAction } from 'store/actions/auth';
import { getCurrentUser, login } from 'api/auth';

export function loginEffect(cfg, options, cb) {
    const sendRequest = Api.execResult({ action: requestPostLoginAction, method: login });

    return sendRequest(cfg, options, cb);
}

export function getCurrentUserEffect(cfg, options, cb) {
    const sendRequest = Api.execBase({ action: requestGetCurrentUserAction, method: getCurrentUser });

    return sendRequest(cfg, options, cb);
}
