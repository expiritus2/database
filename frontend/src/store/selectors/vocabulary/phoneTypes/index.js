import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyPhoneTypesSelector = createSelector(
    localState,
    ({ phoneTypes }) => ({
        isIdle: phoneTypes.state === IDLE,
        isPending: phoneTypes.state === PENDING,
        isData: !!phoneTypes.data,
        phoneTypes: phoneTypes.data || [],
    }),
);
