import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyLanguageLevelsSelector = createSelector(
    localState,
    ({ languageLevels }) => ({
        isIdle: languageLevels.state === IDLE,
        isPending: languageLevels.state === PENDING,
        isData: !!languageLevels.data,
        languageLevels: languageLevels.data || [],
    }),
);
