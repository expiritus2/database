import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyEducationsSelector = createSelector(
    localState,
    ({ educations }) => ({
        isIdle: educations.state === IDLE,
        isPending: educations.state === PENDING,
        isData: !!educations.data,
        educations: educations.data || [],
    }),
);
