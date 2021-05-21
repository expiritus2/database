import { saveVocabularyCurrencyAction } from 'store/actions/vocabulary';
import { saveVocabularyCurrency } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyCurrencyEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyCurrencyAction, method: saveVocabularyCurrency };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
