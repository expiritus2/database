import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyEventTypesSelector = createSelector(
    localState,
    ({ eventTypes }) => ({
        isIdle: eventTypes.state === IDLE,
        isPending: eventTypes.state === PENDING,
        isData: !!eventTypes.data,
        eventTypes: eventTypes.data || [],
    }),
);
