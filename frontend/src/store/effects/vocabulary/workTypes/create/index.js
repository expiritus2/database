import { saveVocabularyWorkTypeAction, saveVocabularyWorkTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyWorkType, saveVocabularyWorkTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyWorkTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyWorkTypeAction, method: saveVocabularyWorkType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyWorkTypesEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyWorkTypesAction, method: saveVocabularyWorkTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
