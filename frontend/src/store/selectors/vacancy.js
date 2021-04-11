import { createSelector } from 'reselect';

const localState = ({ vacancy }) => vacancy;

export const getCurrentVacancySelector = createSelector(
    localState,
    (vacancy) => vacancy,
);
