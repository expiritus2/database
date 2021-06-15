import { saveVocabularyEventTypeAction, saveVocabularyEventTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyEventType, saveVocabularyEventTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyEventTypeEffect = Api.execResult({
    action: saveVocabularyEventTypeAction,
    method: saveVocabularyEventType,
});

export const saveVocabularyEventTypesEffect = Api.execResult({
    action: saveVocabularyEventTypesAction,
    method: saveVocabularyEventTypes,
});
