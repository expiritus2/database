import { updateVocabularyLanguageAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyLanguage } from 'api/vocabulary';

export const updateVocabularyLanguageEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: updateVocabularyLanguageAction,
        method: updateVocabularyLanguage,
    });

    return sendRequest(cfg, options, cb);
};
