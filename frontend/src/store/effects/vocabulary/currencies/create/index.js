import { saveVocabularyCurrencyAction, saveVocabularyCurrenciesAction } from 'store/actions/vocabulary';
import { saveVocabularyCurrency, saveVocabularyCurrencies } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyCurrencyEffect = Api.execResult({
    action: saveVocabularyCurrencyAction,
    method: saveVocabularyCurrency,
});

export const saveVocabularyCurrenciesEffect = Api.execResult({
    action: saveVocabularyCurrenciesAction,
    method: saveVocabularyCurrencies,
});
