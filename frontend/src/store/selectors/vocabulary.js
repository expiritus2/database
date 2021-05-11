import { createSelector } from 'reselect';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularySelector = createSelector(
    localState,
    (vocabulary) => vocabulary,
);

export const getVocabularyDataSelector = createSelector(
    localState,
    (vocabulary) => vocabulary?.data,
);

export const getResourcesUsersSelector = createSelector(
    getVocabularyDataSelector,
    (vocabularyData) => vocabularyData?.users || [],
);

export const getVocabularyPositionsSelector = createSelector(
    getVocabularyDataSelector,
    (vocabularyData) => vocabularyData?.positions || [],
);

export const getVocabularyRegionsSelector = createSelector(
    getVocabularyDataSelector,
    (vocabularyData) => vocabularyData?.regions || [],
);

export const getVocabularySkillsSelector = createSelector(
    getVocabularyDataSelector,
    (vocabularyData) => vocabularyData?.skills || [],
);

export const getVocabularyCompaniesSelector = createSelector(
    getVocabularyDataSelector,
    (vocabularyData) => vocabularyData?.companies || [],
);

export const getVocabularyContactsSelector = createSelector(
    getVocabularyDataSelector,
    (vocabularyData) => vocabularyData?.contacts || [],
);

export const getVocabularyModeSelector = createSelector(
    localState,
    (vocabulary) => vocabulary?.mode,
);
