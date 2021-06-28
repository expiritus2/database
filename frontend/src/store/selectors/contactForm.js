import { createSelector } from 'reselect';

const localState = ({ forms }) => forms;

export const getContactFormSelector = createSelector(
    localState,
    (forms) => ({
        formFields: forms?.contact?.data || {},
        errors: forms?.contact?.errors || [],
    }),
);
