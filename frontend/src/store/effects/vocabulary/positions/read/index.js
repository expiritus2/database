import { getVocabularyPositionsAction } from 'store/actions/vocabulary';
import { getVocabularyPositions } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyPositionsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyPositionsAction, method: getVocabularyPositions };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
