import { deleteVocabularyPositionAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyPosition } from 'api/vocabulary/positions';

export const deleteVocabularyPositionEffect = Api.execResult({
    action: deleteVocabularyPositionAction,
    method: deleteVocabularyPosition,
});
