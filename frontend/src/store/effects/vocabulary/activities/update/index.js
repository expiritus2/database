import { updateVocabularyActivityAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyActivity } from 'api/vocabulary';

export const updateVocabularyActivityEffect = Api.execResult({
    action: updateVocabularyActivityAction,
    method: updateVocabularyActivity,
});
