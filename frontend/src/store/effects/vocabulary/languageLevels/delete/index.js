import { deleteVocabularyLanguageLevelAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyLanguageLevel } from 'api/vocabulary';

export const deleteVocabularyLanguageLevelEffect = Api.execResult({
    action: deleteVocabularyLanguageLevelAction,
    method: deleteVocabularyLanguageLevel,
});
