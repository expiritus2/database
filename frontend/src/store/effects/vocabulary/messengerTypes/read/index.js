import { getVocabularyMessengerTypesAction } from 'store/actions/vocabulary';
import { getVocabularyMessengerTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyMessengerTypesEffect = Api.execResult({
    action: getVocabularyMessengerTypesAction,
    method: getVocabularyMessengerTypes,
});
