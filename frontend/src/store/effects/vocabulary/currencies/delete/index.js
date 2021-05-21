import { deleteVocabularyCurrencyAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyCurrency } from 'api/vocabulary';

export const deleteVocabularyCurrencyEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteVocabularyCurrencyAction, method: deleteVocabularyCurrency });

    return sendRequest(cfg, options, cb);
};
