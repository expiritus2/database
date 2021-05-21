import { updateVocabularyCurrencyAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyCurrency } from 'api/vocabulary';

export const updateVocabularyCurrencyEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateVocabularyCurrencyAction, method: updateVocabularyCurrency });

    return sendRequest(cfg, options, cb);
};
