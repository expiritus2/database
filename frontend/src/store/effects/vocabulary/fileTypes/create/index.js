import { saveVocabularyFileTypeAction, saveVocabularyFileTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyFileType, saveVocabularyFileTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyFileTypeEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyFileTypeAction, method: saveVocabularyFileType };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyFileTypesEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyFileTypesAction, method: saveVocabularyFileTypes };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
