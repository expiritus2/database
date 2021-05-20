import { saveVocabularyLanguageAction } from 'store/actions/vocabulary';
import { saveVocabularyLanguage } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyLanguageEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyLanguageAction, method: saveVocabularyLanguage };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
