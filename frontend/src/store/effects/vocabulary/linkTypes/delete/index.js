import { deleteVocabularyLinkTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyLinkType } from 'api/vocabulary';

export const deleteVocabularyLinkTypeEffect = Api.execResult({
    action: deleteVocabularyLinkTypeAction,
    method: deleteVocabularyLinkType,
});
