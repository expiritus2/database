import { updateVocabularyCurrencyAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyCurrency } from 'api/vocabulary';

export const updateVocabularyCurrencyEffect = Api.execResult({
    action: updateVocabularyCurrencyAction,
    method: updateVocabularyCurrency,
});
