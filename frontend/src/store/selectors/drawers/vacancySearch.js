import { createSelector } from 'reselect';

const localState = ({ drawers }) => drawers;

export const getVacancySearchDrawerSelector = createSelector(
    localState,
    (drawers) => ({
        open: drawers?.vacancySearch?.open,
        formFields: drawers?.vacancySearch?.formFields,
    }),
);
