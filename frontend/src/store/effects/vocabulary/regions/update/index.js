import { updateVocabularyRegionAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyRegion } from 'api/vocabulary';

export const updateVocabularyRegionEffect = Api.execResult({
    action: updateVocabularyRegionAction,
    method: updateVocabularyRegion,
});
