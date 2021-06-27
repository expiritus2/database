import { deleteVocabularyActivityAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyActivity } from 'api/vocabulary';

export const deleteVocabularyActivityEffect = Api.execResult({
    action: deleteVocabularyActivityAction,
    method: deleteVocabularyActivity,
});
