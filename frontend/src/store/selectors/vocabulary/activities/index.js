import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyActivitiesSelector = createSelector(
    localState,
    ({ activities }) => ({
        isIdle: activities.state === IDLE,
        isPending: activities.state === PENDING,
        isData: !!activities.data,
        activities: activities.data || [],
    }),
);
