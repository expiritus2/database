import { getVocabularyFileTypesAction } from 'store/actions/vocabulary';
import { getVocabularyFileTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyFileTypesEffect = Api.execResult({
    action: getVocabularyFileTypesAction,
    method: getVocabularyFileTypes,
});
