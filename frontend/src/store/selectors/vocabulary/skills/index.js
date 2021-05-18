import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularySkillsSelector = createSelector(
    localState,
    ({ skills }) => ({
        isIdle: skills.state === IDLE,
        isPending: skills.state === PENDING,
        isData: !!skills.data,
        skills: skills.data || [],
    }),
);
