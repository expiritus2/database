import { saveVocabularyPositionAction, saveVocabularyRegionAction, saveVocabularySkillAction } from 'store/actions/vocabulary';
import { saveVocabularyPosition, saveVocabularyRegion, saveVocabularySkill } from 'api/vocabulary';
import Api from 'store/effects/core/api';

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
