import { saveVocabularyRegionAction, saveVocabularyRegionsAction } from 'store/actions/vocabulary';
import { saveVocabularyRegion, saveVocabularyRegions } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyRegionEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyRegionAction, method: saveVocabularyRegion };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyRegionsEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyRegionsAction, method: saveVocabularyRegions };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
