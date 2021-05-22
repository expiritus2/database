import { saveVocabularyMessengerTypeAction, saveVocabularyMessengerTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyMessengerType, saveVocabularyMessengerTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyMessengerTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyMessengerTypeAction, method: saveVocabularyMessengerType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyMessengerTypesEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyMessengerTypesAction, method: saveVocabularyMessengerTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
