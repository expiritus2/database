import { getVocabularyPositionsAction } from 'store/actions/vocabulary';
import { getVocabularyPositions } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyPositionsEffect = Api.execResult({
    action: getVocabularyPositionsAction,
    method: getVocabularyPositions,
});
