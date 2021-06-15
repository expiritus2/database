import { getVocabularyWorkTypesAction } from 'store/actions/vocabulary';
import { getVocabularyWorkTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyWorkTypesEffect = Api.execResult({
    action: getVocabularyWorkTypesAction,
    method: getVocabularyWorkTypes,
});
