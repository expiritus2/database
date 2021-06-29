import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ applicants }) => applicants;

export const getApplicantsSelector = createSelector(
    localState,
    (applicants) => ({
        isPending: applicants?.state === PENDING,
        isIdle: applicants?.state === IDLE,
        count: applicants?.data?.count,
        data: applicants?.data?.rows,
        meta: applicants?.meta,
    }),
);

export const getApplicantsSearchSelector = createSelector(
    localState,
    (applicants) => applicants?.search,
);
