import { createSelector } from 'reselect';

const localState = ({ drawers }) => drawers;

export const getContactSearchDrawerSelector = createSelector(
    localState,
    (drawers) => ({
        open: drawers?.contactSearch?.open,
        formFields: drawers?.contactSearch?.formFields,
    }),
);
