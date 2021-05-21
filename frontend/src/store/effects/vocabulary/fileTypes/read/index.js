import { getVocabularyFileTypesAction } from 'store/actions/vocabulary';
import { getVocabularyFileTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyFileTypesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyFileTypesAction, method: getVocabularyFileTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
