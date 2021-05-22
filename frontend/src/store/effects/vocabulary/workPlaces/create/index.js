import { saveVocabularyWorkPlaceAction, saveVocabularyWorkPlacesAction } from 'store/actions/vocabulary';
import { saveVocabularyWorkPlace, saveVocabularyWorkPlaces } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyWorkPlaceEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyWorkPlaceAction, method: saveVocabularyWorkPlace };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyWorkPlacesEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyWorkPlacesAction, method: saveVocabularyWorkPlaces };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
