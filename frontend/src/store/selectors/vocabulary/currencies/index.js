import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyCurrenciesSelector = createSelector(
    localState,
    ({ currencies }) => ({
        isIdle: currencies.state === IDLE,
        isPending: currencies.state === PENDING,
        isData: !!currencies.data,
        currencies: currencies.data || [],
    }),
);
