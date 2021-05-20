import { getVocabularyWorkTypesAction } from 'store/actions/vocabulary';
import { getVocabularyWorkTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyWorkTypesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyWorkTypesAction, method: getVocabularyWorkTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
