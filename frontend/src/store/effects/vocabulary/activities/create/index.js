import { saveVocabularyActivityAction, saveVocabularyActivitiesAction } from 'store/actions/vocabulary';
import { saveVocabularyActivity, saveVocabularyActivities } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyActivityEffect = Api.execResult({
    action: saveVocabularyActivityAction,
    method: saveVocabularyActivity,
});

export const saveVocabularyActivitiesEffect = Api.execResult({
    action: saveVocabularyActivitiesAction,
    method: saveVocabularyActivities,
});
