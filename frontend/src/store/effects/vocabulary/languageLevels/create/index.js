import { saveVocabularyLanguageLevelAction } from 'store/actions/vocabulary';
import { saveVocabularyLanguageLevel } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyLanguageLevelEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyLanguageLevelAction, method: saveVocabularyLanguageLevel };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
