import { updateVocabularyWorkTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyWorkType } from 'api/vocabulary';

export const updateVocabularyWorkTypeEffect = Api.execResult({
    action: updateVocabularyWorkTypeAction,
    method: updateVocabularyWorkType,
});
