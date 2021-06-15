import { saveVocabularyLanguageAction, saveVocabularyLanguagesAction } from 'store/actions/vocabulary';
import { saveVocabularyLanguage, saveVocabularyLanguages } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyLanguageEffect = Api.execResult({
    action: saveVocabularyLanguageAction,
    method: saveVocabularyLanguage,
});

export const saveVocabularyLanguagesEffect = Api.execResult({
    action: saveVocabularyLanguagesAction,
    method: saveVocabularyLanguages,
});
