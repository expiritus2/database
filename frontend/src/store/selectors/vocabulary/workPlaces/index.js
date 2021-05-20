import { createSelector } from 'reselect';
import { IDLE, PENDING } from 'settings/constants/apiState';

const localState = ({ vocabulary }) => vocabulary;

export const getVocabularyWorkPlacesSelector = createSelector(
    localState,
    ({ workPlaces }) => ({
        isIdle: workPlaces.state === IDLE,
        isPending: workPlaces.state === PENDING,
        isData: !!workPlaces.data,
        workPlaces: workPlaces.data || [],
    }),
);
