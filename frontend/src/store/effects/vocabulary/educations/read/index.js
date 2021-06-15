import { getVocabularyEducationsAction } from 'store/actions/vocabulary';
import { getVocabularyEducations } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyEducationsEffect = Api.execResult({
    action: getVocabularyEducationsAction,
    method: getVocabularyEducations,
});
