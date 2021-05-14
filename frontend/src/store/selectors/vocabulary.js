import { createSelector } from 'reselect';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularySelector = createSelector(
    localState,
    (vocabulary) => vocabulary,
);

export const getResourcesUsersSelector = createSelector(
    getVocabularySelector,
    (vocabularyData) => vocabularyData?.users || [],
);

export const getVocabularyPositionsSelector = createSelector(
    getVocabularySelector,
    (vocabularyData) => vocabularyData?.positions || [],
);

export const getVocabularyRegionsSelector = createSelector(
    getVocabularySelector,
    (vocabularyData) => vocabularyData?.regions || [],
);

export const getVocabularySkillsSelector = createSelector(
    getVocabularySelector,
    (vocabularyData) => vocabularyData?.skills || [],
);

export const getVocabularyCompaniesSelector = createSelector(
    getVocabularySelector,
    (vocabularyData) => vocabularyData?.companies || [],
);

export const getVocabularyContactsSelector = createSelector(
    getVocabularySelector,
    (vocabularyData) => vocabularyData?.contacts || [],
);

export const getVocabularyModeSelector = createSelector(
    getVocabularySelector,
    (vocabulary) => vocabulary?.mode,
);
