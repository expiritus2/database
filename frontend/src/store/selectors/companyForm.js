import { createSelector } from 'reselect';

const localState = ({ forms }) => forms;

export const getCompanyFormSelector = createSelector(
    localState,
    (forms) => forms?.company,
);

export const getCompanyFilesFormStateSelector = createSelector(
    getCompanyFormSelector,
    (company) => company?.files,
);

export const getCompanyFormStateSelector = createSelector(
    getCompanyFormSelector,
    (company) => company?.state,
);
