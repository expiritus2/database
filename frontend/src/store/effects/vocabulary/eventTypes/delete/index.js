import { deleteVocabularyEventTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyEventType } from 'api/vocabulary';

export const deleteVocabularyEventTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: deleteVocabularyEventTypeAction,
        method: deleteVocabularyEventType,
    });

    return sendRequest(cfg, options, cb);
};
