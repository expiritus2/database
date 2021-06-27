import { getVocabularyActivitiesAction } from 'store/actions/vocabulary';
import { getVocabularyActivities } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyActivitiesEffect = Api.execResult({
    action: getVocabularyActivitiesAction,
    method: getVocabularyActivities,
});
