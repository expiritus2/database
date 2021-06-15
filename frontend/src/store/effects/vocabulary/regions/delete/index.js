import { deleteVocabularyRegionAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyRegion } from 'api/vocabulary';

export const deleteVocabularyRegionEffect = Api.execResult({
    action: deleteVocabularyRegionAction,
    method: deleteVocabularyRegion,
});
