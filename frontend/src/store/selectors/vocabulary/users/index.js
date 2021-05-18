import { createSelector } from 'reselect';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyUsersSelector = createSelector(
    localState,
    (vocabularyData) => vocabularyData?.users || [],
);
