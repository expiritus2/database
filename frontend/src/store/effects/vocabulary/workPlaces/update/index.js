import { updateVocabularyWorkPlaceAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyWorkPlace } from 'api/vocabulary';

export const updateVocabularyWorkPlaceEffect = Api.execResult({
    action: updateVocabularyWorkPlaceAction,
    method: updateVocabularyWorkPlace,
});
