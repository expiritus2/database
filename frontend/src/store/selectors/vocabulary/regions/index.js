import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyRegionsSelector = createSelector(
    localState,
    ({ regions }) => ({
        isIdle: regions.state === IDLE,
        isPending: regions.state === PENDING,
        isData: !!regions.data,
        regions: regions.data || [],
    }),
);
