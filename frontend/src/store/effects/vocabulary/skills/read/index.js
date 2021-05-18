import { getVocabularySkillsAction } from 'store/actions/vocabulary';
import { getVocabularySkills } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularySkillsEffect = (cfg, options = {}, cb) => {
    const requestParams = { action: getVocabularySkillsAction, method: getVocabularySkills };
    let sendRequest = Api.execBase(requestParams);

    if (options?.silent) {
        sendRequest = Api.execResult(requestParams);
    }

    return sendRequest(cfg, options, cb);
};
