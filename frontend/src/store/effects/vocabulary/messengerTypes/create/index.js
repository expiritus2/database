import { saveVocabularyMessengerTypeAction } from 'store/actions/vocabulary';
import { saveVocabularyMessengerType } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyMessengerTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyMessengerTypeAction, method: saveVocabularyMessengerType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
