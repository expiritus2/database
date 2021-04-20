import Api from 'store/effects/core/api';
import { getResourcesAction } from 'store/actions/resources';
import { getResources } from 'api/resources';

export const getResourcesEffect = (cfg, options = {}, cb) => {
    const sendRequest = Api.execBase({ action: getResourcesAction, method: getResources });

    return sendRequest({}, options, cb);
};
