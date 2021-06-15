import { getVocabularyPhoneTypesAction } from 'store/actions/vocabulary';
import { getVocabularyPhoneTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyPhoneTypesEffect = Api.execResult({
    action: getVocabularyPhoneTypesAction,
    method: getVocabularyPhoneTypes,
});
