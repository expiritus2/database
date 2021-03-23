import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ applicants }) => applicants;

export const getApplicantsSelector = createSelector(
    localState,
    (applicants) => ({
        isPending: applicants?.state === PENDING,
        isIdle: applicants?.state === IDLE,
        count: applicants?.data?.count,
        data: applicants?.data?.rows.map((applicant) => ({
            ...applicant,
            positions: applicant?.positions?.map(({ label }) => label),
            skills: applicant?.skills?.map(({ label }) => label),
            regions: applicant?.regions?.map(({ label }) => label),
        })),
    }),
);

export const getApplicantsSearchSelector = createSelector(
    localState,
    (applicants) => applicants?.search,
);
