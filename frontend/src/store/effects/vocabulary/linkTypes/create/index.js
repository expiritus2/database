import { saveVocabularyLinkTypeAction } from 'store/actions/vocabulary';
import { saveVocabularyLinkType } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyLinkTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyLinkTypeAction, method: saveVocabularyLinkType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
