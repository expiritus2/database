import { createSelector } from 'reselect';

const localState = ({ forms }) => forms;

export const getContactFormSelector = createSelector(
    localState,
    (forms) => forms?.contact,
);

export const getContactFilesFormStateSelector = createSelector(
    getContactFormSelector,
    (contact) => contact?.files,
);

export const getContactFormStateSelector = createSelector(
    getContactFormSelector,
    (contact) => contact?.state,
);
