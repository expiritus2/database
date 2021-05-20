import { getVocabularyLanguageLevelsAction } from 'store/actions/vocabulary';
import { getVocabularyLanguageLevels } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyLanguageLevelsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyLanguageLevelsAction, method: getVocabularyLanguageLevels };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
