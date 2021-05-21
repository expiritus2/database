import { saveVocabularyPhoneTypeAction } from 'store/actions/vocabulary';
import { saveVocabularyPhoneType } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyPhoneTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyPhoneTypeAction, method: saveVocabularyPhoneType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
