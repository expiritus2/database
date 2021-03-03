import { createSelector } from 'reselect';

const localState = ({ forms }) => forms;

export const getApplicantFormSelector = createSelector(
    localState,
    (forms) => forms?.applicant,
);

export const getApplicantProfileFormStateSelector = createSelector(
    getApplicantFormSelector,
    (applicant) => applicant?.profile,
);

export const getApplicantInfoFormStateSelector = createSelector(
    getApplicantFormSelector,
    (applicant) => applicant?.info,
);

export const getApplicantExperienceFormStateSelector = createSelector(
    getApplicantFormSelector,
    (applicant) => applicant?.info,
);

export const getApplicantFilesFormStateSelector = createSelector(
    getApplicantFormSelector,
    (applicant) => applicant?.info,
);
