import { saveVocabularyEducationAction, saveVocabularyEducationsAction } from 'store/actions/vocabulary';
import { saveVocabularyEducation, saveVocabularyEducations } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyEducationEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyEducationAction, method: saveVocabularyEducation };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyEducationsEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyEducationsAction, method: saveVocabularyEducations };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
