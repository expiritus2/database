import { saveVocabularyWorkScheduleAction } from 'store/actions/vocabulary';
import { saveVocabularyWorkSchedule } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyWorkScheduleEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyWorkScheduleAction, method: saveVocabularyWorkSchedule };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
