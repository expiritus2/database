import { updateVocabularyPositionAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyPosition } from 'api/vocabulary';

export const updateVocabularyPositionEffect = Api.execResult({
    action: updateVocabularyPositionAction,
    method: updateVocabularyPosition,
});
