import { saveVocabularySexAction, saveVocabularySexsAction } from 'store/actions/vocabulary';
import { saveVocabularySex, saveVocabularySexs } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularySexEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularySexAction, method: saveVocabularySex };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularySexsEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularySexsAction, method: saveVocabularySexs };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
