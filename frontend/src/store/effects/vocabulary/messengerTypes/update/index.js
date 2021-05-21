import { updateVocabularyMessengerTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyMessengerType } from 'api/vocabulary';

export const updateVocabularyMessengerTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: updateVocabularyMessengerTypeAction,
        method: updateVocabularyMessengerType,
    });

    return sendRequest(cfg, options, cb);
};
