import { getVocabularyCurrenciesAction } from 'store/actions/vocabulary';
import { getVocabularyCurrencies } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyCurrenciesEffect = Api.execResult({
    action: getVocabularyCurrenciesAction,
    method: getVocabularyCurrencies,
});
