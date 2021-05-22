import { saveVocabularyWorkScheduleAction, saveVocabularyWorkSchedulesAction } from 'store/actions/vocabulary';
import { saveVocabularyWorkSchedule, saveVocabularyWorkSchedules } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyWorkScheduleEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyWorkScheduleAction, method: saveVocabularyWorkSchedule };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyWorkSchedulesEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyWorkSchedulesAction, method: saveVocabularyWorkSchedules };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
