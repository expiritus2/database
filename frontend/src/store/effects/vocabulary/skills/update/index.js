import { updateVocabularySkillAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularySkill } from 'api/vocabulary';

export const updateVocabularySkillEffect = Api.execResult({
    action: updateVocabularySkillAction,
    method: updateVocabularySkill,
});
