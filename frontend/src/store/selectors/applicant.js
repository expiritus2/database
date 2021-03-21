import { createSelector } from 'reselect';

const localState = ({ applicant }) => applicant;

export const getCurrentApplicantSelector = createSelector(
    localState,
    (applicant) => applicant,
);
