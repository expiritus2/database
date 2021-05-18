import { createSelector } from 'reselect';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyCompaniesSelector = createSelector(
    localState,
    (vocabularyData) => vocabularyData?.companies || [],
);
