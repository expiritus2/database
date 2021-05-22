import { saveVocabularyPositionAction, saveVocabularyPositionsAction } from 'store/actions/vocabulary/positions';
import { saveVocabularyPosition, saveVocabularyPositions } from 'api/vocabulary/positions';
import Api from 'store/effects/core/api';

export const saveVocabularyPositionEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyPositionAction, method: saveVocabularyPosition };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyPositionsEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyPositionsAction, method: saveVocabularyPositions };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
