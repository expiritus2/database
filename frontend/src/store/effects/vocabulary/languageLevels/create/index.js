import { saveVocabularyLanguageLevelAction, saveVocabularyLanguageLevelsAction } from 'store/actions/vocabulary';
import { saveVocabularyLanguageLevel, saveVocabularyLanguageLevels } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyLanguageLevelEffect = Api.execResult({
    action: saveVocabularyLanguageLevelAction,
    method: saveVocabularyLanguageLevel,
});

export const saveVocabularyLanguageLevelsEffect = Api.execResult({
    action: saveVocabularyLanguageLevelsAction,
    method: saveVocabularyLanguageLevels,
});
