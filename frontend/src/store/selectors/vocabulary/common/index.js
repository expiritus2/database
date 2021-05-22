import { createSelector } from 'reselect';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularySelector = createSelector(
    localState,
    (vocabulary) => vocabulary,
);

export const getVocabularyTabDataSelector = createSelector(
    localState,
    (_, props) => props,
    (vocabulary, { activeTab }) => (vocabulary?.[activeTab]?.data ? vocabulary[activeTab]?.data : []),
);

export const getVocabularyModeSelector = createSelector(
    getVocabularySelector,
    (vocabulary) => vocabulary?.mode,
);
