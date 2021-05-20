import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyWorkTypesSelector = createSelector(
    localState,
    ({ workTypes }) => ({
        isIdle: workTypes.state === IDLE,
        isPending: workTypes.state === PENDING,
        isData: !!workTypes.data,
        workTypes: workTypes.data || [],
    }),
);
