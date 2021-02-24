import { createSelector } from 'reselect';

const localState = ({ user }) => user;

export const getUserSelector = createSelector(
    localState,
    (user) => user,
);
