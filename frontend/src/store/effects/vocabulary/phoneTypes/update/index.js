import { updateVocabularyPhoneTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyPhoneType } from 'api/vocabulary';

export const updateVocabularyPhoneTypeEffect = Api.execResult({
    action: updateVocabularyPhoneTypeAction,
    method: updateVocabularyPhoneType,
});
