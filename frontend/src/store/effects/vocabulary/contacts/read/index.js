import { getVocabularyContactsAction } from 'store/actions/vocabulary';
import { getVocabularyContacts } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyContactsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyContactsAction, method: getVocabularyContacts };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
