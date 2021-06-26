import { createSelector } from 'reselect';
import { IDLE, PENDING } from '../../settings/constants/apiState';

const localState = ({ applicant }) => applicant;

export const getCurrentApplicantSelector = createSelector(
    localState,
    (applicant) => ({
        isIdle: applicant.state === IDLE,
        isPending: applicant.state === PENDING,
        isData: !!applicant?.data,
        applicant: applicant?.data,
    }),
);
