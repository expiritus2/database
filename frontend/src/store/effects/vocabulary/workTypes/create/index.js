import { saveVocabularyWorkTypeAction, saveVocabularyWorkTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyWorkType, saveVocabularyWorkTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyWorkTypeEffect = Api.execResult({
    action: saveVocabularyWorkTypeAction,
    method: saveVocabularyWorkType,
});

export const saveVocabularyWorkTypesEffect = Api.execResult({
    action: saveVocabularyWorkTypesAction,
    method: saveVocabularyWorkTypes,
});
