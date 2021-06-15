import { saveVocabularyWorkPlaceAction, saveVocabularyWorkPlacesAction } from 'store/actions/vocabulary';
import { saveVocabularyWorkPlace, saveVocabularyWorkPlaces } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyWorkPlaceEffect = Api.execResult({
    action: saveVocabularyWorkPlaceAction,
    method: saveVocabularyWorkPlace,
});

export const saveVocabularyWorkPlacesEffect = Api.execResult({
    action: saveVocabularyWorkPlacesAction,
    method: saveVocabularyWorkPlaces,
});
