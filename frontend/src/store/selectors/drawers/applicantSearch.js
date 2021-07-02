import { createSelector } from 'reselect';

const localState = ({ drawers }) => drawers;

export const getApplicantSearchDrawerSelector = createSelector(
    localState,
    (drawers) => ({
        open: drawers?.applicantSearch?.open,
        formFields: drawers?.applicantSearch?.formFields,
    }),
);
