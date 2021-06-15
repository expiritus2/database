import { getVocabularyLinkTypesAction } from 'store/actions/vocabulary';
import { getVocabularyLinkTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyLinkTypesEffect = Api.execResult({
    action: getVocabularyLinkTypesAction,
    method: getVocabularyLinkTypes,
});
