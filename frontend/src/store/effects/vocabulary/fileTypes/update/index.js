import { updateVocabularyFileTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyFileType } from 'api/vocabulary';

export const updateVocabularyFileTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: updateVocabularyFileTypeAction,
        method: updateVocabularyFileType,
    });

    return sendRequest(cfg, options, cb);
};
