import { getVocabularyCurrenciesAction } from 'store/actions/vocabulary';
import { getVocabularyCurrencies } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyCurrenciesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyCurrenciesAction, method: getVocabularyCurrencies };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
