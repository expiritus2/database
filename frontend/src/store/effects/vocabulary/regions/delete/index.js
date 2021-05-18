import { deleteVocabularyRegionAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyRegion } from 'api/vocabulary';

export const deleteVocabularyRegionEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteVocabularyRegionAction, method: deleteVocabularyRegion });

    return sendRequest(cfg, options, cb);
};
