import { updateVocabularyLinkTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyLinkType } from 'api/vocabulary';

export const updateVocabularyLinkTypeEffect = Api.execResult({
    action: updateVocabularyLinkTypeAction,
    method: updateVocabularyLinkType,
});
