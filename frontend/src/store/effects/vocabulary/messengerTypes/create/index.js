import { saveVocabularyMessengerTypeAction, saveVocabularyMessengerTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyMessengerType, saveVocabularyMessengerTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyMessengerTypeEffect = Api.execResult({
    action: saveVocabularyMessengerTypeAction,
    method: saveVocabularyMessengerType,
});

export const saveVocabularyMessengerTypesEffect = Api.execResult({
    action: saveVocabularyMessengerTypesAction,
    method: saveVocabularyMessengerTypes,
});
