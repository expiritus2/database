import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ contact }) => contact;

export const getCurrentContactSelector = createSelector(
    localState,
    (contact) => ({
        isIdle: contact.state === IDLE,
        isPending: contact.state === PENDING,
        isData: !!contact?.data,
        contact: contact?.data,
    }),
);
