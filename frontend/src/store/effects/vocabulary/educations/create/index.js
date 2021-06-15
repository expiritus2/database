import { saveVocabularyEducationAction, saveVocabularyEducationsAction } from 'store/actions/vocabulary';
import { saveVocabularyEducation, saveVocabularyEducations } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyEducationEffect = Api.execResult({
    action: saveVocabularyEducationAction,
    method: saveVocabularyEducation,
});

export const saveVocabularyEducationsEffect = Api.execResult({
    action: saveVocabularyEducationsAction,
    method: saveVocabularyEducations,
});
