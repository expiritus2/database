import { saveVocabularyLinkTypeAction, saveVocabularyLinkTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyLinkType, saveVocabularyLinkTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyLinkTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyLinkTypeAction, method: saveVocabularyLinkType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyLinkTypesEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyLinkTypesAction, method: saveVocabularyLinkTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
