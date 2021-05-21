import { getVocabularyEducationsAction } from 'store/actions/vocabulary';
import { getVocabularyEducations } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyEducationsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyEducationsAction, method: getVocabularyEducations };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
