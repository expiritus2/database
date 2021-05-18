import { saveVocabularyRegionAction } from 'store/actions/vocabulary';
import { saveVocabularyRegion } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyRegionEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyRegionAction, method: saveVocabularyRegion };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
