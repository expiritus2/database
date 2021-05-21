import { saveVocabularyFileTypeAction } from 'store/actions/vocabulary';
import { saveVocabularyFileType } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyFileTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyFileTypeAction, method: saveVocabularyFileType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
