import { getVocabularyEventTypesAction } from 'store/actions/vocabulary';
import { getVocabularyEventTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyEventTypesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyEventTypesAction, method: getVocabularyEventTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
