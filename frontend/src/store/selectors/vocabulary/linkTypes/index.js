import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyLinkTypesSelector = createSelector(
    localState,
    ({ linkTypes }) => ({
        isIdle: linkTypes.state === IDLE,
        isPending: linkTypes.state === PENDING,
        isData: !!linkTypes.data,
        linkTypes: linkTypes.data || [],
    }),
);
