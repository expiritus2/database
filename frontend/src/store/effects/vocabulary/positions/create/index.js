import { saveVocabularyPositionAction } from 'store/actions/vocabulary/positions';
import { saveVocabularyPosition } from 'api/vocabulary/positions';
import Api from 'store/effects/core/api';

export const saveVocabularyPositionEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyPositionAction, method: saveVocabularyPosition };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
