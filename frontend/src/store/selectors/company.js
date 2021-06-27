import { createSelector } from 'reselect';
import { IDLE, PENDING } from '../../settings/constants/apiState';

const localState = ({ company }) => company;

export const getCurrentCompanySelector = createSelector(
    localState,
    (company) => ({
        isIdle: company.state === IDLE,
        isPending: company.state === PENDING,
        isData: !!company?.data,
        company: company?.data,
    }),
);
