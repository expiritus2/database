import Api from 'store/effects/core/api';
import {
    getVocabularyPositionsAction,
    getVocabularyRegionsAction,
    getVocabularySkillsAction,
    setVocabularyModeAction,
    getVocabularyCompaniesAction,
    getVocabularyContactsAction,
    getUsersAction,
    saveVocabularySkillAction,
    saveVocabularyPositionAction,
    saveVocabularyRegionAction,
} from 'store/actions/vocabulary';
import {
    getVocabularyPositions,
    getVocabularyRegions,
    getVocabularySkills,
    getVocabularyCompanies,
    getVocabularyContacts,
    getUsers,
    saveVocabularySkill,
    saveVocabularyPosition,
    saveVocabularyRegion,
} from 'api/vocabulary';

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

export const setVocabularyModeEffect = (cfg) => (dispatch) => {
    dispatch(setVocabularyModeAction(cfg));
};

export const saveVocabularySkillEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularySkillAction, method: saveVocabularySkill };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyPositionEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyPositionAction, method: saveVocabularyPosition };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};

export const saveVocabularyRegionEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularyRegionAction, method: saveVocabularyRegion };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
