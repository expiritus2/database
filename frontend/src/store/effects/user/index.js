import Api from 'store/effects/core/api';
import { updateUserAction } from 'store/actions/user';
import { updateUser } from 'api/user';

export const updateUserEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateUserAction, method: updateUser });

    const config = {
        displayName: cfg?.displayName || undefined,
        oldPassword: cfg?.oldPassword || undefined,
        newPassword: cfg?.newPassword || undefined,
    };

    return sendRequest(config, options, cb);
};
