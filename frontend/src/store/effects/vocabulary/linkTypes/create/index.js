import { saveVocabularyLinkTypeAction, saveVocabularyLinkTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyLinkType, saveVocabularyLinkTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyLinkTypeEffect = Api.execResult({
    action: saveVocabularyLinkTypeAction,
    method: saveVocabularyLinkType,
});

export const saveVocabularyLinkTypesEffect = Api.execResult({
    action: saveVocabularyLinkTypesAction,
    method: saveVocabularyLinkTypes,
});
