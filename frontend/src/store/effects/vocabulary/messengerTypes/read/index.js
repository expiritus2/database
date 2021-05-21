import { getVocabularyMessengerTypesAction } from 'store/actions/vocabulary';
import { getVocabularyMessengerTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyMessengerTypesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyMessengerTypesAction, method: getVocabularyMessengerTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
