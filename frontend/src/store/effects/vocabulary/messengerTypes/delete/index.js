import { deleteVocabularyMessengerTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyMessengerType } from 'api/vocabulary';

export const deleteVocabularyMessengerTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: deleteVocabularyMessengerTypeAction,
        method: deleteVocabularyMessengerType,
    });

    return sendRequest(cfg, options, cb);
};
