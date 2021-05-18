import { getVocabularyRegionsAction } from 'store/actions/vocabulary';
import { getVocabularyRegions } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyRegionsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyRegionsAction, method: getVocabularyRegions };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
