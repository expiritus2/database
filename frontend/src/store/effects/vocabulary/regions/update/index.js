import { updateVocabularyRegionAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyRegion } from 'api/vocabulary';

export const updateVocabularyRegionEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateVocabularyRegionAction, method: updateVocabularyRegion });

    return sendRequest(cfg, options, cb);
};
