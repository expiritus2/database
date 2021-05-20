import { deleteVocabularyWorkTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyWorkType } from 'api/vocabulary';

export const deleteVocabularyWorkTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteVocabularyWorkTypeAction, method: deleteVocabularyWorkType });

    return sendRequest(cfg, options, cb);
};
