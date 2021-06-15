import { deleteVocabularyCurrencyAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyCurrency } from 'api/vocabulary';

export const deleteVocabularyCurrencyEffect = Api.execResult({
    action: deleteVocabularyCurrencyAction,
    method: deleteVocabularyCurrency,
});
