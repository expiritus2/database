import { saveVocabularyEventTypeAction, saveVocabularyEventTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyEventType, saveVocabularyEventTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyEventTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyEventTypeAction, method: saveVocabularyEventType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyEventTypesEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyEventTypesAction, method: saveVocabularyEventTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
