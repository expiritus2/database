import { createSelector } from 'reselect';

const localState = ({ forms }) => forms;

export const getApplicantFormSelector = createSelector(
    localState,
    (forms) => forms?.applicant,
);

export const getApplicantExperienceFormStateSelector = createSelector(
    getApplicantFormSelector,
    (applicant) => applicant?.experiences,
);

export const getApplicantFilesFormStateSelector = createSelector(
    getApplicantFormSelector,
    (applicant) => applicant?.files,
);

export const getApplicantFormStateSelector = createSelector(
    getApplicantFormSelector,
    (applicant) => applicant?.state,
);
