import { getVocabularyLanguagesAction } from 'store/actions/vocabulary';
import { getVocabularyLanguages } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyLanguagesEffect = Api.execResult({
    action: getVocabularyLanguagesAction,
    method: getVocabularyLanguages,
});
