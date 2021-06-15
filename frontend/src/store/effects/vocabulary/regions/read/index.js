import { getVocabularyRegionsAction } from 'store/actions/vocabulary';
import { getVocabularyRegions } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyRegionsEffect = Api.execResult({
    action: getVocabularyRegionsAction,
    method: getVocabularyRegions,
});
