import { updateVocabularyLanguageAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyLanguage } from 'api/vocabulary';

export const updateVocabularyLanguageEffect = Api.execResult({
    action: updateVocabularyLanguageAction,
    method: updateVocabularyLanguage,
});
