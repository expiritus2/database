import { saveVocabularyLanguageLevelAction, saveVocabularyLanguageLevelsAction } from 'store/actions/vocabulary';
import { saveVocabularyLanguageLevel, saveVocabularyLanguageLevels } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyLanguageLevelEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyLanguageLevelAction, method: saveVocabularyLanguageLevel };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyLanguageLevelsEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyLanguageLevelsAction, method: saveVocabularyLanguageLevels };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
