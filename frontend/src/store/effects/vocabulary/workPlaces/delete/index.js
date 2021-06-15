import { deleteVocabularyWorkPlaceAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyWorkPlace } from 'api/vocabulary';

export const deleteVocabularyWorkPlaceEffect = Api.execResult({
    action: deleteVocabularyWorkPlaceAction,
    method: deleteVocabularyWorkPlace,
});
