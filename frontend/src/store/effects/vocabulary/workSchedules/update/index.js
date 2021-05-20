import { updateVocabularyWorkScheduleAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyWorkSchedule } from 'api/vocabulary';

export const updateVocabularyWorkScheduleEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: updateVocabularyWorkScheduleAction,
        method: updateVocabularyWorkSchedule,
    });

    return sendRequest(cfg, options, cb);
};
