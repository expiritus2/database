import { saveVocabularyFileTypeAction, saveVocabularyFileTypesAction } from 'store/actions/vocabulary';
import { saveVocabularyFileType, saveVocabularyFileTypes } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularyFileTypeEffect = Api.execResult({
    action: saveVocabularyFileTypeAction,
    method: saveVocabularyFileType,
});

export const saveVocabularyFileTypesEffect = Api.execResult({
    action: saveVocabularyFileTypesAction,
    method: saveVocabularyFileTypes,
});
