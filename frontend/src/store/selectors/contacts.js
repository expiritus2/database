import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ contacts }) => contacts;

export const getContactsSelector = createSelector(
    localState,
    (contacts) => ({
        isPending: contacts?.state === PENDING,
        isIdle: contacts?.state === IDLE,
        count: contacts?.data?.count,
        data: contacts?.data?.rows.map((contact) => ({
            ...contact,
            positions: contact?.positions?.map(({ label }) => label),
        })),
        meta: contacts?.meta,
    }),
);

export const getContactsSearchSelector = createSelector(
    localState,
    (contacts) => contacts?.search,
);
