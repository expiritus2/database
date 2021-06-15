import { deleteVocabularyPhoneTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyPhoneType } from 'api/vocabulary';

export const deleteVocabularyPhoneTypeEffect = Api.execResult({
    action: deleteVocabularyPhoneTypeAction,
    method: deleteVocabularyPhoneType,
});
