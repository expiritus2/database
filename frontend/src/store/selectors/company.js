import { createSelector } from 'reselect';

const localState = ({ company }) => company;

export const getCurrentCompanySelector = createSelector(
    localState,
    (company) => company,
);
