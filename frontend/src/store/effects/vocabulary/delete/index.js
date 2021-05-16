import { deleteVocabularySkillAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularySkill } from 'api/vocabulary/delete';

export const deleteVocabularySkillEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteVocabularySkillAction, method: deleteVocabularySkill });

    return sendRequest(cfg, options, cb);
};
