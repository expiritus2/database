import { saveVocabularyPhoneTypeAction, saveVocabularyPhoneTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyPhoneType, saveVocabularyPhoneTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyPhoneTypeEffect = Api.execResult({
    action: saveVocabularyPhoneTypeAction,
    method: saveVocabularyPhoneType,
});

export const saveVocabularyPhoneTypesEffect = Api.execResult({
    action: saveVocabularyPhoneTypesAction,
    method: saveVocabularyPhoneTypes,
});
