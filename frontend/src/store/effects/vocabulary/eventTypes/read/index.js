import { getVocabularyEventTypesAction } from 'store/actions/vocabulary';
import { getVocabularyEventTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyEventTypesEffect = Api.execResult({
    action: getVocabularyEventTypesAction,
    method: getVocabularyEventTypes,
});
