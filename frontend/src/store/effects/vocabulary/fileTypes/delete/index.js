import { deleteVocabularyFileTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyFileType } from 'api/vocabulary';

export const deleteVocabularyFileTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: deleteVocabularyFileTypeAction,
        method: deleteVocabularyFileType,
    });

    return sendRequest(cfg, options, cb);
};
