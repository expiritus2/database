import { createSelector } from 'reselect';

const localState = ({ contact }) => contact;

export const getCurrentContactSelector = createSelector(
    localState,
    (contact) => contact,
);
