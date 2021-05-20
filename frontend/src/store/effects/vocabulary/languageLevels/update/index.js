import { updateVocabularyLanguageLevelAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyLanguageLevel } from 'api/vocabulary';

export const updateVocabularyLanguageLevelEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: updateVocabularyLanguageLevelAction,
        method: updateVocabularyLanguageLevel,
    });

    return sendRequest(cfg, options, cb);
};
