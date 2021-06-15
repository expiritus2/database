import { updateVocabularyFileTypeAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyFileType } from 'api/vocabulary';

export const updateVocabularyFileTypeEffect = Api.execResult({
    action: updateVocabularyFileTypeAction,
    method: updateVocabularyFileType,
});
