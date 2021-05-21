import { getVocabularyPhoneTypesAction } from 'store/actions/vocabulary';
import { getVocabularyPhoneTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyPhoneTypesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyPhoneTypesAction, method: getVocabularyPhoneTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
