import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyContactsSelector = createSelector(
    localState,
    ({ contacts }) => ({
        isIdle: contacts.state === IDLE,
        isPending: contacts.state === PENDING,
        isData: !!contacts.data,
        contacts: contacts.data || [],
    }),
);
