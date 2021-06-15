import { getVocabularyWorkPlacesAction } from 'store/actions/vocabulary';
import { getVocabularyWorkPlaces } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyWorkPlacesEffect = Api.execResult({
    action: getVocabularyWorkPlacesAction,
    method: getVocabularyWorkPlaces,
});
