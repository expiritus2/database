import Api from 'store/effects/core/api';
import { generateDataAction } from 'store/actions/fake';
import { generateData } from 'api/fake';

export const generateDataEffect = (cfg, options, cb) => {
    const sendRequest = Api.execBase({ action: generateDataAction, method: generateData });

    return sendRequest(cfg, options, cb);
};
