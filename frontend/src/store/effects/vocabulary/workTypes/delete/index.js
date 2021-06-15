import { deleteVocabularyWorkTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyWorkType } from 'api/vocabulary';

export const deleteVocabularyWorkTypeEffect = Api.execResult({
    action: deleteVocabularyWorkTypeAction,
    method: deleteVocabularyWorkType,
});
