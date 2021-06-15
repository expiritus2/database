import { updateVocabularyEducationAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyEducation } from 'api/vocabulary';

export const updateVocabularyEducationEffect = Api.execResult({
    action: updateVocabularyEducationAction,
    method: updateVocabularyEducation,
});
