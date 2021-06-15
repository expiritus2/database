import { updateVocabularyLanguageLevelAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyLanguageLevel } from 'api/vocabulary';

export const updateVocabularyLanguageLevelEffect = Api.execResult({
    action: updateVocabularyLanguageLevelAction,
    method: updateVocabularyLanguageLevel,
});
