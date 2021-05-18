import { createSelector } from 'reselect';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyContactsSelector = createSelector(
    localState,
    (vocabularyData) => vocabularyData?.contacts || [],
);
