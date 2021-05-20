import { getVocabularyWorkSchedulesAction } from 'store/actions/vocabulary';
import { getVocabularyWorkSchedules } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyWorkSchedulesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyWorkSchedulesAction, method: getVocabularyWorkSchedules };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
