import { saveVocabularyEventTypeAction } from 'store/actions/vocabulary';
import { saveVocabularyEventType } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyEventTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyEventTypeAction, method: saveVocabularyEventType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
