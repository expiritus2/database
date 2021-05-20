import { getVocabularyWorkPlacesAction } from 'store/actions/vocabulary';
import { getVocabularyWorkPlaces } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyWorkPlacesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyWorkPlacesAction, method: getVocabularyWorkPlaces };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
