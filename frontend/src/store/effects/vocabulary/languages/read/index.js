import { getVocabularyLanguagesAction } from 'store/actions/vocabulary';
import { getVocabularyLanguages } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyLanguagesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyLanguagesAction, method: getVocabularyLanguages };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
