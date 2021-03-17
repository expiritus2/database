import { createSelector } from 'reselect';

const localState = ({ applicants }) => applicants;

export const getApplicantsSelector = createSelector(
    localState,
    (applicants) => applicants,
);
