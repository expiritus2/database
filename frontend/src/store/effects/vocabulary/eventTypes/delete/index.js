import { deleteVocabularyEventTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyEventType } from 'api/vocabulary';

export const deleteVocabularyEventTypeEffect = Api.execResult({
    action: deleteVocabularyEventTypeAction,
    method: deleteVocabularyEventType,
});
