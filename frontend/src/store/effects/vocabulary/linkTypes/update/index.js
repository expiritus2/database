import { updateVocabularyLinkTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyLinkType } from 'api/vocabulary';

export const updateVocabularyLinkTypeEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: updateVocabularyLinkTypeAction,
        method: updateVocabularyLinkType,
    });

    return sendRequest(cfg, options, cb);
};
