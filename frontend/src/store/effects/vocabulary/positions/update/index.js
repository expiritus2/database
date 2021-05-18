import { updateVocabularyPositionAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyPosition } from 'api/vocabulary';

export const updateVocabularyPositionEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateVocabularyPositionAction, method: updateVocabularyPosition });

    return sendRequest(cfg, options, cb);
};
