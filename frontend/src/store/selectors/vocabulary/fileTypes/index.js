import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyFileTypesSelector = createSelector(
    localState,
    ({ fileTypes }) => ({
        isIdle: fileTypes.state === IDLE,
        isPending: fileTypes.state === PENDING,
        isData: !!fileTypes.data,
        fileTypes: fileTypes.data || [],
    }),
);
