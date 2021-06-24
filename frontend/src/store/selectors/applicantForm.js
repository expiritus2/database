import { createSelector } from 'reselect';

const localState = ({ forms }) => forms;

export const getApplicantFormSelector = createSelector(
    localState,
    (forms) => ({
        formFields: forms?.applicant?.data || {},
        errors: forms?.applicant?.errors || [],
    }),
);
