import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularySexsSelector = createSelector(
    localState,
    ({ sexs }) => ({
        isIdle: sexs.state === IDLE,
        isPending: sexs.state === PENDING,
        isData: !!sexs.data,
        sexs: sexs.data || [],
    }),
);
