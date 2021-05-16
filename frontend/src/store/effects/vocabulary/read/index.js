import {
    getUsersAction,
    getVocabularyCompaniesAction,
    getVocabularyContactsAction,
    getVocabularyPositionsAction,
    getVocabularyRegionsAction,
    getVocabularySkillsAction,
} from 'store/actions/vocabulary';
import {
    getUsers,
    getVocabularyCompanies, getVocabularyContacts,
    getVocabularyPositions,
    getVocabularyRegions,
    getVocabularySkills,
} from 'api/vocabulary';
import Api from 'store/effects/core/api';

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
    const requestParams = {
        action: getVocabularyCompaniesAction,
        method: getVocabularyCompanies,
    };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};

export const getVocabularyContactsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularyContactsAction, method: getVocabularyContacts };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};

export const getUsersEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getUsersAction, method: getUsers };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest({}, options, cb);
};
