import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ companies }) => companies;

export const getCompaniesSelector = createSelector(
    localState,
    (companies) => ({
        isPending: companies?.state === PENDING,
        isIdle: companies?.state === IDLE,
        count: companies?.data?.count,
        data: companies?.data?.rows.map((company) => ({
            ...company,
        })),
        meta: companies?.meta,
    }),
);

export const getCompaniesSearchSelector = createSelector(
    localState,
    (companies) => companies?.search,
);
