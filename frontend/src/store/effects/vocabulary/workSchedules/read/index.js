import { getVocabularyWorkSchedulesAction } from 'store/actions/vocabulary';
import { getVocabularyWorkSchedules } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyWorkSchedulesEffect = Api.execResult({
    action: getVocabularyWorkSchedulesAction,
    method: getVocabularyWorkSchedules,
});
