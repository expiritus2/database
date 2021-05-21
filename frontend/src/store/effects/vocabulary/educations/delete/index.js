import { deleteVocabularyEducationAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularyEducation } from 'api/vocabulary';

export const deleteVocabularyEducationEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: deleteVocabularyEducationAction, method: deleteVocabularyEducation });

    return sendRequest(cfg, options, cb);
};
