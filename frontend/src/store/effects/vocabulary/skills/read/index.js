import { getVocabularySkillsAction } from 'store/actions/vocabulary';
import { getVocabularySkills } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularySkillsEffect = Api.execResult({
    action: getVocabularySkillsAction,
    method: getVocabularySkills,
});
