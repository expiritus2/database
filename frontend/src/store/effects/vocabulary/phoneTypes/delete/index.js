import { deleteVocabularyPhoneTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyPhoneType } from 'api/vocabulary';

export const deleteVocabularyPhoneTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: deleteVocabularyPhoneTypeAction,
        method: deleteVocabularyPhoneType,
    });

    return sendRequest(cfg, options, cb);
};
