import { deleteVocabularyLanguageAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyLanguage } from 'api/vocabulary';

export const deleteVocabularyLanguageEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: deleteVocabularyLanguageAction,
        method: deleteVocabularyLanguage,
    });

    return sendRequest(cfg, options, cb);
};
