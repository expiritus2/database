import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyPositionsSelector = createSelector(
    localState,
    ({ positions }) => ({
        isIdle: positions.state === IDLE,
        isPending: positions.state === PENDING,
        isData: !!positions.data,
        positions: positions.data || [],
    }),
);
