import Api from 'store/effects/core/api';
import { requestGetCurrentUserAction, loginAction, enrollAccountAction } from 'store/actions/auth';
import { getCurrentUser, login, enrollAccount } from 'api/auth';

export const loginEffect = Api.execResult({ action: loginAction, method: login });
export const enrollAccountEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: enrollAccountAction, method: enrollAccount });

    const config = {
        username: cfg?.username || undefined,
        displayName: cfg?.displayName || undefined,
        password: cfg?.password || undefined,
        token: cfg?.token,
    };

    return sendRequest(config, options, cb);
};
export const getCurrentUserEffect = Api.execResult({ action: requestGetCurrentUserAction, method: getCurrentUser });
