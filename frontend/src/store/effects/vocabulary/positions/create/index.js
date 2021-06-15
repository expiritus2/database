import { saveVocabularyPositionAction, saveVocabularyPositionsAction } from 'store/actions/vocabulary/positions';
import { saveVocabularyPosition, saveVocabularyPositions } from 'api/vocabulary/positions';
import Api from 'store/effects/core/api';

export const saveVocabularyPositionEffect = Api.execResult({
    action: saveVocabularyPositionAction,
    method: saveVocabularyPosition,
});

export const saveVocabularyPositionsEffect = Api.execResult({
    action: saveVocabularyPositionsAction,
    method: saveVocabularyPositions,
});
