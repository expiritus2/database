import { getVocabularyLinkTypesAction } from 'store/actions/vocabulary';
import { getVocabularyLinkTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyLinkTypesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyLinkTypesAction, method: getVocabularyLinkTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
