import { saveVocabularySkillAction, saveVocabularySkillsAction } from 'store/actions/vocabulary';
import { saveVocabularySkill, saveVocabularySkills } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularySkillEffect = Api.execResult({
    action: saveVocabularySkillAction,
    method: saveVocabularySkill,
});

export const saveVocabularySkillsEffect = Api.execResult({
    action: saveVocabularySkillsAction,
    method: saveVocabularySkills,
});
