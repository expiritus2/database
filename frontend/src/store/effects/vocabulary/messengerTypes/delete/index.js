import { deleteVocabularyMessengerTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyMessengerType } from 'api/vocabulary';

export const deleteVocabularyMessengerTypeEffect = Api.execResult({
    action: deleteVocabularyMessengerTypeAction,
    method: deleteVocabularyMessengerType,
});
