import { createSelector } from 'reselect';

const localState = ({ forms }) => forms;

export const getCompanyFormSelector = createSelector(
    localState,
    (forms) => ({
        formFields: forms?.company?.data || {},
        errors: forms?.company?.errors || [],
    }),
);
