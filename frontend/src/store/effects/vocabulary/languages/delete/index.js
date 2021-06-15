import { deleteVocabularyLanguageAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyLanguage } from 'api/vocabulary';

export const deleteVocabularyLanguageEffect = Api.execResult({
    action: deleteVocabularyLanguageAction,
    method: deleteVocabularyLanguage,
});
