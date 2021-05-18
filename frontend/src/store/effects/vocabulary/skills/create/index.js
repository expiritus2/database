import { saveVocabularySkillAction } from 'store/actions/vocabulary';
import { saveVocabularySkill } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularySkillEffect = (cfg, options, cb) => {
    const requestParams = { action: saveVocabularySkillAction, method: saveVocabularySkill };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
