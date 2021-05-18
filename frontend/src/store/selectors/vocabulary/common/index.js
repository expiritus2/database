import { createSelector } from 'reselect';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyModeSelector = createSelector(
    localState,
    (vocabulary) => vocabulary?.mode,
);
