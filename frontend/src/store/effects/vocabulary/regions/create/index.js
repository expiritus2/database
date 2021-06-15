import { saveVocabularyRegionAction, saveVocabularyRegionsAction } from 'store/actions/vocabulary';
import { saveVocabularyRegion, saveVocabularyRegions } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyRegionEffect = Api.execResult({
    action: saveVocabularyRegionAction,
    method: saveVocabularyRegion,
});

export const saveVocabularyRegionsEffect = Api.execResult({
    action: saveVocabularyRegionsAction,
    method: saveVocabularyRegions,
});
