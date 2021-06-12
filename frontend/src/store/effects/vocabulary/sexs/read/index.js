import { getVocabularySexsAction } from 'store/actions/vocabulary';
import { getVocabularySexs } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularySexsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularySexsAction, method: getVocabularySexs };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
