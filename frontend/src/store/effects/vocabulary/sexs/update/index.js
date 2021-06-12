import { updateVocabularySexAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularySex } from 'api/vocabulary';

export const updateVocabularySexEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({
        action: updateVocabularySexAction,
        method: updateVocabularySex,
    });

    return sendRequest(cfg, options, cb);
};
