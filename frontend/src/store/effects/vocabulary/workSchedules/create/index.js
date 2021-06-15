import { saveVocabularyWorkScheduleAction, saveVocabularyWorkSchedulesAction } from 'store/actions/vocabulary';
import { saveVocabularyWorkSchedule, saveVocabularyWorkSchedules } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyWorkScheduleEffect = Api.execResult({
    action: saveVocabularyWorkScheduleAction,
    method: saveVocabularyWorkSchedule,
});

export const saveVocabularyWorkSchedulesEffect = Api.execResult({
    action: saveVocabularyWorkSchedulesAction,
    method: saveVocabularyWorkSchedules,
});
