import { saveVocabularyWorkTypeAction } from 'store/actions/vocabulary';
import { saveVocabularyWorkType } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyWorkTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyWorkTypeAction, method: saveVocabularyWorkType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
