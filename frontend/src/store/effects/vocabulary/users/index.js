import { getUsersAction } from 'store/actions/vocabulary';
import { getUsers } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getUsersEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getUsersAction, method: getUsers };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};
