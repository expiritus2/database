import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyLanguagesSelector = createSelector(
    localState,
    ({ languages }) => ({
        isIdle: languages.state === IDLE,
        isPending: languages.state === PENDING,
        isData: !!languages.data,
        languages: languages.data || [],
    }),
);
