import { getVocabularyLanguageLevelsAction } from 'store/actions/vocabulary';
import { getVocabularyLanguageLevels } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyLanguageLevelsEffect = Api.execResult({
    action: getVocabularyLanguageLevelsAction,
    method: getVocabularyLanguageLevels,
});
