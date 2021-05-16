import { updateVocabularySkillAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularySkill } from 'api/vocabulary/update';

export const updateVocabularySkillEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateVocabularySkillAction, method: updateVocabularySkill });

    return sendRequest(cfg, options, cb);
};
