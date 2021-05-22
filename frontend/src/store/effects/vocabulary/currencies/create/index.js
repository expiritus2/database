import { saveVocabularyCurrencyAction, saveVocabularyCurrenciesAction } from 'store/actions/vocabulary';
import { saveVocabularyCurrency, saveVocabularyCurrencies } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyCurrencyEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyCurrencyAction, method: saveVocabularyCurrency };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyCurrenciesEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyCurrenciesAction, method: saveVocabularyCurrencies };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
