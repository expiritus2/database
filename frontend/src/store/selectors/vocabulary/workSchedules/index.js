import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyWorkSchedulesSelector = createSelector(
    localState,
    ({ workSchedules }) => ({
        isIdle: workSchedules.state === IDLE,
        isPending: workSchedules.state === PENDING,
        isData: !!workSchedules.data,
        workSchedules: workSchedules.data || [],
    }),
);
