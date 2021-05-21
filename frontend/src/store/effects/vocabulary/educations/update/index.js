import { updateVocabularyEducationAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularyEducation } from 'api/vocabulary';

export const updateVocabularyEducationEffect = (cfg, options, cb) => {
    const sendRequest = Api.execResult({ action: updateVocabularyEducationAction, method: updateVocabularyEducation });

    return sendRequest(cfg, options, cb);
};
