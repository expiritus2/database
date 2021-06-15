import { updateVocabularyEventTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyEventType } from 'api/vocabulary';

export const updateVocabularyEventTypeEffect = Api.execResult({
    action: updateVocabularyEventTypeAction,
    method: updateVocabularyEventType,
});
