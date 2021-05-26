import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyUsersSelector = createSelector(
    localState,
    ({ users }) => ({
        isIdle: users.state === IDLE,
        isPending: users.state === PENDING,
        isData: !!users.data,
        users: users.data || [],
    }),
);
