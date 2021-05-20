import { updateVocabularyWorkTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyWorkType } from 'api/vocabulary';

export const updateVocabularyWorkTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateVocabularyWorkTypeAction, method: updateVocabularyWorkType });

    return sendRequest(cfg, options, cb);
};
