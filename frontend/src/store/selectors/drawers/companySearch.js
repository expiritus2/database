import { createSelector } from 'reselect';

const localState = ({ drawers }) => drawers;

export const getCompanySearchDrawerSelector = createSelector(
    localState,
    (drawers) => ({
        open: drawers?.companySearch?.open,
        formFields: drawers?.companySearch?.formFields,
    }),
);
