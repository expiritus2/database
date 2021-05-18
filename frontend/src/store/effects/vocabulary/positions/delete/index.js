import { deleteVocabularyPositionAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyPosition } from 'api/vocabulary/positions';

export const deleteVocabularyPositionEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteVocabularyPositionAction, method: deleteVocabularyPosition });

    return sendRequest(cfg, options, cb);
};
