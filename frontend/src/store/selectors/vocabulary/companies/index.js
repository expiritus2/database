import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyCompaniesSelector = createSelector(
    localState,
    ({ companies }) => ({
        isIdle: companies.state === IDLE,
        isPending: companies.state === PENDING,
        isData: !!companies.data,
        companies: companies.data || [],
    }),
);
