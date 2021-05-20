import { deleteVocabularyWorkScheduleAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyWorkSchedule } from 'api/vocabulary';

export const deleteVocabularyWorkScheduleEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: deleteVocabularyWorkScheduleAction,
        method: deleteVocabularyWorkSchedule,
    });

    return sendRequest(cfg, options, cb);
};
