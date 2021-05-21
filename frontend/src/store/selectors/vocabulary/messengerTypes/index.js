import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyMessengerTypesSelector = createSelector(
    localState,
    ({ messengerTypes }) => ({
        isIdle: messengerTypes.state === IDLE,
        isPending: messengerTypes.state === PENDING,
        isData: !!messengerTypes.data,
        messengerTypes: messengerTypes.data || [],
    }),
);
