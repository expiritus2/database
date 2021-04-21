import Api from 'store/effects/core/api';
import { getVocabularyResourcesAction, getVocabularyPositionsAction, getVocabularyRegionsAction, getVocabularySkillsAction } from 'store/actions/resources';
import { getVocabularyResources, getVocabularyPositions, getVocabularyRegions, getVocabularySkills, getVocabularyCompanies } from 'api/resources';
import { getCompaniesAction } from '../../actions/companies';

export const getVocabularyResourcesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyResourcesAction, method: getVocabularyResources };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};

export const getVocabularyPositionsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyPositionsAction, method: getVocabularyPositions };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};

export const getVocabularyRegionsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyRegionsAction, method: getVocabularyRegions };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};

export const getVocabularySkillsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularySkillsAction, method: getVocabularySkills };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};

export const getVocabularyCompaniesEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getCompaniesAction, method: getVocabularyCompanies };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};
