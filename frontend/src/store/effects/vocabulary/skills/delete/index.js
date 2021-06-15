import { deleteVocabularySkillAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularySkill } from 'api/vocabulary';

export const deleteVocabularySkillEffect = Api.execResult({
    action: deleteVocabularySkillAction,
    method: deleteVocabularySkill,
});
