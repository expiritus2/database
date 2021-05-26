import { getVocabularyCompaniesAction } from 'store/actions/vocabulary';
import { getVocabularyCompanies } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyCompaniesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyCompaniesAction, method: getVocabularyCompanies };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
